const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Products = require('./Products');
const connectDB = require('./ProductsDB'); // Ensure this points to your database connection function

const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.status(200).send('Hello world!'));

// Endpoint to add a new product
app.post('/products/add', async (req, res) => {
  const productDetail = req.body;

  console.log('Product Detail >>>>', productDetail);

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
    const products = await Products.find({}); // Using await with find() to get all products
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

app.listen(port, () => console.log('Listening on port', port));
