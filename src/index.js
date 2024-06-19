import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
// Render the App component into the root element of the HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: If you want to measure performance of your app
reportWebVitals();
