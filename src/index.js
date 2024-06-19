// Import necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your global CSS file
import App from './App'; // Import your main App component
import reportWebVitals from './reportWebVitals'; // Optional: Import for reporting web vitals

// Render the App component into the root element of the HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: If you want to measure performance of your app
reportWebVitals();
