import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './Homepage';
import ShopMain from './components/Shop_page/ShopMain';
import ProductDetails from "./components/Shop_page/ProductDetails";
import { Container } from "reactstrap";
import './components/Shop_page/Card.css';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopMain />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
