// Import necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your global CSS file
import App from './App'; // Import your main App component
import reportWebVitals from './reportWebVitals'; // Optional: Import for reporting web vitals
import { Auth0Provider } from '@auth0/auth0-react';
// Render the App component into the root element of the HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-a3h42errc2tx6ec7.us.auth0.com"
    clientId="X9Y7bGmi4qZU9D6m7nqQq6vVBsunbaRF"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  > 
    <App />
  
  </Auth0Provider>
);

// Optional: If you want to measure performance of your app
reportWebVitals();
