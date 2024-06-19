import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ShopMain from './components/ShopMain';
import ProductDetails from './components/ProductDetails'; 
import prodData from './Alldata/prodData'; 

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ShopMain prodData={prodData} />
        </Route>
        {prodData.map((product) => (
          <Route 
            key={product.id} 
            path={`/product/${product.id}`} 
            children={<ProductDetails product={product} />} 
          />
        ))}
      </Switch>
    </Router>
  );
};

export default App;
