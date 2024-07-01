import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import ShopMain from './components/Shop_page/ShopMain';
import ProductDetails from './components/Shop_page/ProductDetails';
import { Container } from 'reactstrap';
import { CartProvider, Cart } from './components/Cart_page/CartProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import Register from './components/Login_signup/Register';
import Login from './components/Login_signup/Login';
import AddProduct from './components/AddProduct/AddProduct';


function App() {
  return (
    <Container>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products/get" element={<ShopMain />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shop/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addproduct" element={<AddProduct />} />



          </Routes>
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
