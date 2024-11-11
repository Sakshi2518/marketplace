import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './Homepage';
import Dashboard from "./components/Home_page/Dashboard";
import ShopMain from './components/Shop_page/ShopMain';
import ProductDetails from './components/Shop_page/ProductDetails';
import { Container } from 'reactstrap';
import { CartProvider } from './components/Cart_page/CartProvider';
import ContextCart from './components/Cart_page/ContextCart'; // Import ContextCart
//import YourOrders from './components/Profile_Page/YourOrders'; // Import YourOrders
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import Register from './components/Login_signup/Register';
import Login from './components/Login_signup/Login';
import Profile from './components/Profile_Page/Profile';
import { OrderProvider } from './components/Profile_Page/OrderContext';
import EditSettings from "./components/Profile_Page/EditSettings";

function App() {
  
  
  return (
   
      <Container>
        <BrowserRouter>
          <CartProvider>
            <OrderProvider>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products/get" element={<ShopMain />} />
                <Route path="/shop/cart" element={<ContextCart />} />
                <Route path="/products/:_id" element={<ProductDetails/>} />
                <Route path="/signup" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products/add" element={<Profile />} />
                <Route path="/user/yourorders" element={<Profile />} /> 
                <Route path="/user/account_settings" element={<Profile />} /> 
                <Route path="/user/update/:_id" element={<EditSettings />} /> 

              </Routes>
            </OrderProvider>
          </CartProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </Container>
  );
}

export default App;