const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./ProductsDB");
require("dotenv").config();

const User = require("./Users");
const Product = require("./Products");

const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Endpoint to register a new user
app.post("/signup", async (req, res) => {
  const {  username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint to login a user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid email or password");
    }
    const token = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint to add a new product
app.post("/products/add", authenticateToken, async (req, res) => {
  const { productDetail } = req.body;
  try {
    const product = new Product({
      ...productDetail,
      userID: req.user.userID,
    });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint to fetch all products for the logged-in user
app.get("/products/get", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find({ userID: req.user.userID });
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => console.log("Listening on port", port));
