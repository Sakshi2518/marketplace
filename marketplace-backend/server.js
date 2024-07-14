const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer'); // Include nodemailer module
const Products = require('./Products');
const connectDB = require('./ProductsDB');
require('dotenv').config();
const UserModel=require('./models/Users');
const connect2DB = require('./models/UsersDB');


const app = express();
const port = 4000;


///////////

const env = process.env.NODE_ENV || 'development';
const uri = env === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI2;

///////////

// Connect to MongoDB
connectDB(uri);
///////
//connect2DB();
/////////

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.status(200).send('Hello world!'));

//Register

app.post("/login",(req,res)=>{
  const {email,password}=req.body;
  UserModel.findOne({email: email})
  .then(user=>{
    if(user){
      if(user.password===password){
        res.json("Success")
      }
      else{
        res.json("The password is incorrect")
      }
    }
    else{
      res.json("No record existed")
    }
  })
})

app.post('/register',(req,res)=>{
  UserModel.create(req.body)
  .then(users=>res.json(users))
  .catch(err=>res.json(err))  
})

//mongoose.connect("mongodb://127.0.0.1:27017/users");

/////////////


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

app.get('/products/get', async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  let mailOptions = {
    from: email, // Use user's email as the sender
    to: 'igmarketplace.help@gmail.com', // Replace with your help email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});


app.listen(port, () => console.log('Server is running on port', port));
