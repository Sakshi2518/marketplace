const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./ProductsDB");
require("dotenv").config();
const cookieParser = require('cookie-parser');

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
app.use(cookieParser())

// Endpoint to register 
const saltRounds = 10; 
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ success: false, message: "Error creating user" });
    }
    
    User.create({ username, email, password: hashedPassword })
      .then(user => res.json(user))
      .catch(err => res.status(500).json({ success: false, message: "Error creating user", error: err }));
  });
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

        const accessToken = jwt.sign({ email: email }, process.env.JWT_ACCESS_TOKEN_SECRET || "jwt-access-token-secret-key", { expiresIn: '5m' });
        const refreshToken = jwt.sign({ email: email }, process.env.JWT_REFRESH_TOKEN_SECRET || "jwt-refresh-token-secret-key", { expiresIn: '10m' });

        console.log('Generated accessToken:', accessToken);
        console.log('Generated refreshToken:', refreshToken);

        res.cookie('accessToken', accessToken, { maxAge: 300000, httpOnly: true, secure: false, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { maxAge: 600000, httpOnly: true, secure: false, sameSite: 'strict' });
        return res.json({ Login: true });
      });
    })
    .catch(err => {
      console.error("Login error:", err);
      res.status(500).json({ Login: false, Message: "Internal server error" });
    });
});

// Endpoint to add a new product
app.post('/products/add', async (req, res) => {
  const productDetail = req.body;

  try {
    const data = await Products.create(productDetail);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

// Endpoint to fetch all products 
app.get('/products/get', async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

// Endpoint single product by ID
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

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    console.log("Access token not found");
    return res.status(401).json({ valid: false, message: "Access token not found" });
  }

  jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET || 'jwt-access-token-secret-key', (err, decoded) => {
    if (err) {
      console.log("Access token verification failed:", err.message);
      if (renewToken(req, res)) {
        next(); 
      } else {
        console.log("Token renewal failed");
        return res.status(401).json({ valid: false, message: "Invalid or expired token" });
      }
    } else {
      console.log("Access token verified, user email:", decoded.email);
      req.email = decoded.email;
      next(); 
    }
  });
};

const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    console.log("Refresh token not found");
    return false;
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET || 'jwt-refresh-token-secret-key', (err, decoded) => {
    if (err) {
      console.log("Refresh token verification failed:", err.message);
      return false;
    } else {
      const accessToken = jwt.sign({ email: decoded.email }, process.env.JWT_ACCESS_TOKEN_SECRET || "jwt-access-token-secret-key", { expiresIn: '1m' });
      res.cookie('accessToken', accessToken, { maxAge: 60000, httpOnly: true, secure: false, sameSite: 'strict' });
      req.accessToken = accessToken;
      console.log("Token renewed successfully");
      return true; 
    }
  });
};
//autorize at dashboard
app.get('/dashboard', verifyUser, (req, res) => {
  res.json({ valid: true, message: "Authorized" });
});

app.listen(port, () => console.log("Listening on port", port));