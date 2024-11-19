const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./ProductsDB");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const { uploadOnCloudinary , deleteFromCloudinary } = require("./Cloudinary");
const { upload } = require("./Multer");

const User = require("./Users");
const Products = require("./Products");
const Order = require("./Orders")

const app = express();
const port = 4000;

connectDB();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  
}));
app.use(cookieParser());

// Error handling middleware
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  }
};

// Endpoint to register
const saltRounds = 10;
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, phoneNo } = req.body;

    if (!username || !email || !password || !phoneNo) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await User.create({ username, email, password: hashedPassword, phoneNo });

    return res.status(201).json({ success: true, user });

  } catch (err) {
    console.error("Error in /signup:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Endpoint to login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received for email:", email);

  User.findOne({ email })
    .then(user => {
      if (!user) {
        console.log("User not found for email:", email);
        return res.json({ Login: false, Message: "User not found" });
      }

      console.log("User found:", user);

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("bcrypt compare error:", err);
          return res.status(500).json({ Login: false, Message: "Internal server error" });
        }

        if (!result) {
          console.log("Password mismatch for user:", email);
          return res.json({ Login: false, Message: "Invalid credentials" });
        }

        const accessToken = jwt.sign({ email: email }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ email: email }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '90m' });

        console.log('Generated accessToken:', accessToken);
        console.log('Generated refreshToken:', refreshToken);

        // user.refreshToken= refreshToken
        //await user.save({ validateBeforeUse: true})

        res.cookie('accessToken', accessToken, { maxAge: 3600000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { maxAge: 6000000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
        return res.json({ Login: true });
      });
    })
    .catch(err => {
      console.error("Login error:", err);
      res.status(500).json({ Login: false, Message: "Internal server error" });
    });
});

// Middleware to verify user
const verifyUser = asyncHandler(async(req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

  const user = await User.findOne({ email: decodedToken.email }).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;
  next();
});

//refresh token fn

//LOGOUT ENDPOINT
app.post("/logout", (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  console.log("User logged out successfully");
  return res.json({ Logout: true, Message: "Logged out successfully" });
});


app.put('/user/profile/update-pic/:userId', upload.single('profImage'), async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Profile image is required' });
    }

    // Upload to Cloudinary
    const profImgPath = req.file.path;
    const profImageResponse = await uploadOnCloudinary(profImgPath);
    const profImageUrl = profImageResponse?.secure_url;

    if (!profImageUrl) {
      return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
    }

    // Find the user and update the profile image URL
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the previous image from Cloudinary (if any)
    if (user.profImage) {
      const oldPublicId = user.profImage.split('/').pop().split('.')[0]; // Extract Cloudinary public ID
      await deleteFromCloudinary(oldPublicId);
    }

    user.profImage = profImageUrl; // Update profile picture URL
    await user.save();

    console.log('Updated profile image URL:', user.profImage);

    // Delete the temporary file from the server
    fs.unlinkSync(profImgPath);

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profImage: profImageUrl,
    });
  } catch (err) {
    console.error('Error during update:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// =======================================
// DELETE - Remove Profile Picture
// =======================================
app.delete('/user/profile/remove-pic/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has a profile image
    if (user.profImage) {
      // Delete the profile image from Cloudinary
      const publicId = user.profImage.split('/').pop().split('.')[0];
      await deleteFromCloudinary(publicId);

      // Remove the profile image URL from the user's record
      user.profImage = null;
      await user.save();

      res.status(200).json({ message: 'Profile picture deleted successfully' });
    } else {
      res.status(400).json({ message: 'No profile picture to delete' });
    }
  } catch (err) {
    console.error('Error during deletion:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Endpoint to add product
app.post('/products/add', upload.fields([
  { name: "imgUrl", maxCount: 1 },
  { name: "altImages", maxCount: 3 }
]), async (req, res) => {
  const productDetail = req.body;

  try {
    const mainImagePath = req.files?.imgUrl?.[0]?.path;
    const altImagePaths = req.files?.altImages || [];

    if (!mainImagePath || altImagePaths.length === 0) {
      return res.status(400).send("Images are required");
    }

    const mainImageResponse = await uploadOnCloudinary(mainImagePath);
    const mainImageUrl = mainImageResponse?.secure_url;

    const altImageUrls = [];
    for (const altImage of altImagePaths) {
      const altImageResponse = await uploadOnCloudinary(altImage.path);
      altImageUrls.push(altImageResponse?.secure_url);
    }

    const data = await Products.create({
      ...productDetail,
      imgUrl: mainImageUrl,
      altImages: altImageUrls,
      seller: {
        userId: productDetail.userId,
      },
    });

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.error(err);
  }
});

//end point to fetch orders
app.get('/products/get', verifyUser, async (req, res) => {
  try {
    const products = await Products.aggregate([
      {
        $lookup: {
          from: "orders", 
          localField: "_id",
          foreignField: "products.product",
          as: "orderDetails",
        },
      },
      {
        $match: {
          orderDetails: {
            $not: {
              $elemMatch: { "products.isOrdered": true }
            }
          }
        }
      },
      {
        $project: {
          orderDetails: 0 
        }
      }
    ]);

    res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});




// Endpoint to fetch product by ID
app.get("/products/:_id", async (req, res) => {
  try {
    const product = await Products.findById(req.params._id).populate({
      path: "seller.userId",
      select: "username email", // Fields from the User model to include
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// User profile
app.get('/user/profile', verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      // Create a response object with all fields, but only include them if they exist
      const responseData = {
        username: user.username,
        profImage: user.profImage || null,
        dob: user.dob || null,
        university: user.university || null,
        gradYear: user.gradYear || null,
        phoneNo: user.phoneNo,
        email: user.email,
        address: user.address || null,
        _id: user._id
      };

      res.status(200).json(responseData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Endpoint to update user by ID

app.put('/user/update/:id', async (req, res) => {
  const { id } = req.params;
  
  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  // Proceed with updating user data
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});




app.get('/user/yourorders/:_id', async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid ObjectId" });
  }

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          buyer: new mongoose.Types.ObjectId(_id)
        }
      },
      {
        $unwind: "$products" // Unwind the 'products' array so we can process individual products
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product', // Reference to the 'product' field inside 'products'
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: {
          path: '$productDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'seller',
          foreignField: '_id',
          as: 'sellerDetails'
        }
      },
      {
        $unwind: {
          path: '$sellerDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          orderDate: 1,
          "products.deliveryDate": 1, // Include deliveryDate for each product
          "products.isDelivered": 1, // Include isDelivered for each product
          "productDetails._id":1,
          "productDetails.prod_name": 1,
          "productDetails.price": 1,
          "productDetails.imgUrl": 1,
          "productDetails.altImages": 1,
          "sellerDetails.username": 1,
          "sellerDetails.email": 1
        }
      }
    ]);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/orders/create-order", async (req, res) => {
  const { items, totalAmount, buyerId, deliveryDetails, orderDate, sellerId } = req.body;

  try {
    const newOrder = new Order({
      buyer: buyerId, // assuming buyerId is sent from the frontend
      products: items.map(item => ({
        product: item.product, // Map cart items to products
        deliveryDate: item.deliveryDate,
        isOrdered: item.isOrdered,
        isDelivered: false
      })),
      orderDate: orderDate,
      seller: sellerId,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
});



app.get('/user/youritems/:_id', async (req, res) => {
  const { _id } = req.params;

  // Ensure valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid ObjectId" });
  }

  try {
    // Step 1: Aggregation pipeline for products
    const products = await Products.aggregate([
      {
        $match: {
          "seller.userId": new mongoose.Types.ObjectId(_id),  // Ensure proper instantiation
        }
      },
      {
        $lookup: {
          from: 'users',  // Join with the 'users' collection to get seller details
          localField: 'seller.userId',  // Seller's userId field in Products
          foreignField: '_id',  // _id field in the 'users' collection
          as: 'sellerDetails'
        }
      },
      {
        $unwind: "$sellerDetails"  // Unwind the 'sellerDetails' array to get individual seller data
      },
      {
        $project: {
          _id: 1,
          prod_name: 1,
          price: 1,
          imgUrl: 1,
          description: 1,
          category: 1,
          seller: {
            username: "$sellerDetails.username",
            email: "$sellerDetails.email"
          }
        }
      }
    ]);

    // Step 2: Aggregation pipeline for orders
    const orders = await Order.aggregate([
      {
        // Match orders where the seller matches the provided _id
        $match: {
          seller: new mongoose.Types.ObjectId(_id)  // Ensure proper ObjectId instantiation
        }
      },
      {
        // Lookup the product details from the Products collection
        $lookup: {
          from: 'products',  // The name of your products collection in MongoDB
          localField: 'products.product',  // The field in the Order schema that references the product
          foreignField: '_id',  // The _id field in the Products collection
          as: 'productDetails'  // Alias for the result
        }
      },
      {
        // Unwind the products array to work with individual product objects
        $unwind: "$products"
      },
      {
        // Lookup the product details from the 'products' collection
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        // Unwind the 'productDetails' array to extract product information for each product in the order
        $unwind: "$productDetails"
      },
      {
        // Lookup buyer details from the 'users' collection
        $lookup: {
          from: 'users',
          localField: 'buyer',  // The field in the Order schema that references the buyer
          foreignField: '_id',  // The _id field in the 'users' collection
          as: 'buyerDetails'  // Alias for the result
        }
      },
      {
        // Unwind the buyerDetails array
        $unwind: "$buyerDetails"
      },
      {
        // Project the final result shape, including relevant fields
        $project: {
          _id: 1,
          orderDate: 1,
          products: {
            product: {
              _id: "$productDetails._id",
              prod_name: "$productDetails.prod_name",
              price: "$productDetails.price",
              imgUrl: "$productDetails.imgUrl"
            },
            deliveryDate: 1,  // Keep the delivery date from the products array
            isDelivered: 1  // Keep the delivery status from the products array
          },
          buyer: {
            username: "$buyerDetails.username",
            email: "$buyerDetails.email"
          }
        }
      }
    ]);
    
    res.status(200).json({ products, orders });
  } catch (error) {
    console.error("Error in fetching data:", error);
    res.status(500).json({ error: error.message });
  }
});

// Example backend route
app.put('/user/yourorders/:orderId/mark-delivered', async (req, res) => {
  const { orderId } = req.params;
  const { productId } = req.body;
  
  console.log('Order ID:', orderId);
  console.log('Product ID:', productId);

  if (!orderId || !productId) {
    return res.status(400).json({ error: 'Missing orderId or productId' });
  }

  try {
    // Your logic to mark the product as delivered for the given order
    // Example: Find the order by ID, then update the specific product's delivery status
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Find the product within the order's products list
    const product = order.products.find((p) => p.product.toString() === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found in order' });
    }

    product.isDelivered = true; // Or update delivery status as needed
    await order.save();

    res.status(200).json({ message: 'Product marked as delivered' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



app.put('/user/update-delivery-date/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { productId, deliveryDate } = req.body;  // Now also accepting productId and deliveryDate in the request body

    // Validate that deliveryDate and productId are provided
    if (!productId || !deliveryDate) {
      return res.status(400).json({ message: 'Product ID and delivery date are required' });
    }

    const order = await Order.findById(orderId);
      if (!order) {
        console.error(`Order with ID ${orderId} not found`);
        return res.status(404).json({ message: 'Order not found' });
      }

      // Check if order.products is an array
      if (!Array.isArray(order.products)) {
        console.error('Products field is not an array:', order.products);
        return res.status(500).json({ message: 'Invalid order structure' });
      }

      // Find the product in the order's products array
      const productIndex = order.products.findIndex(
        (product) => product.product.toString() === productId
      );

      if (productIndex === -1) {
        console.error(`Product with ID ${productId} not found in order ${orderId}`);
        return res.status(404).json({ message: 'Product not found in this order' });
      }

      console.log('Product found at index:', productIndex);


    // Update the delivery date for the specific product
    order.products[productIndex].deliveryDate = new Date(deliveryDate);

    // Save the updated order
    await order.save();

    // Respond with success message and updated order data
    res.status(200).json({ message: 'Delivery date updated successfully', order });
  } catch (error) {
    console.error('Error updating delivery date:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});



// Dashboard authorization
app.get('/dashboard', verifyUser, (req, res) => {
  res.json({ valid: true, message: "Authorized" });
});









app.listen(port, () => console.log("Listening on port", port));
