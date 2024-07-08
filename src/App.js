import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Homepage from './Homepage';
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

function App() {
  return (
    <Auth0Provider
      domain="dev-a3h42errc2tx6ec7.us.auth0.com"
      clientId="X9Y7bGmi4qZU9D6m7nqQq6vVBsunbaRF"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Container>
        <BrowserRouter>
          <CartProvider>
            <OrderProvider>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products/get" element={<ShopMain />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/shop/cart" element={<ContextCart />} /> {/* Ensure ContextCart is used */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products/add" element={<Profile />} />
                <Route path="/user/yourorders" element={<Profile />} /> {/* Ensure YourOrders is used */}
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
    </Auth0Provider>
  );
}

export default App;
