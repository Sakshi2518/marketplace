const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./ProductsDB");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const { uploadOnCloudinary } = require("./Cloudinary");
const { upload } = require("./Multer");

const User = require("./Users");
const Products = require("./Products");

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

        res.cookie('accessToken', accessToken, { maxAge: 300000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { maxAge: 600000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
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

// Endpoint to add product
app.post('/products/add', verifyUser, upload.fields([
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
    });

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.error(err);
  }
});

// Endpoint to fetch all products
app.get('/products/get', verifyUser, async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

// Endpoint to fetch product by ID
app.get('/products/:_id', async (req, res) => {
  try {
    let result = await Products.findOne({ _id: req.params._id });
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// User profile
app.get('/user/profile', verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); 
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Endpoint to update user by ID
app.put(
  '/user/update/:_id',
  verifyUser, // Assuming verifyUser middleware is properly handling authentication
  upload.fields([{ name: 'profImage', maxCount: 1 }]), // Handle file uploads
  async (req, res) => {
    try {
      const { _id } = req.params;

      // Validate if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Extract the update data from the request body
      const updateData = req.body;

      // Check if a profile image was uploaded
      let coverImageUrl;
      if (req.files?.profImage?.length) {
        const coverImagePath = req.files.profImage[0].path;
        try {
          // Upload the image to Cloudinary
          const coverImageResponse = await uploadOnCloudinary(coverImagePath);
          coverImageUrl = coverImageResponse?.secure_url;
        } catch (cloudinaryError) {
          console.error('Cloudinary upload failed:', cloudinaryError);
          return res.status(500).json({ message: 'Failed to upload profile image' });
        }
      }

      // Include profile image URL in the update data only if it exists
      if (coverImageUrl) {
        updateData.profImage = coverImageUrl;
      }

      // Perform the update in the database
      const updatedUser = await Users.findByIdAndUpdate(
        _id,
        updateData,
        { new: true, runValidators: true } // Ensure updated user is returned and run validators
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return the response after successful update
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
      console.error('Error during update:', err.stack); // Log the error for debugging

      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', error: err.message });
      }

      // Send a generic server error response for any other errors
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);


// Dashboard authorization
app.get('/dashboard', verifyUser, (req, res) => {
  res.json({ valid: true, message: "Authorized" });
});

app.listen(port, () => console.log("Listening on port", port));
