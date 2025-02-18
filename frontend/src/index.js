import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/style.css';



// Log the backend URL for debugging
const backendUrl = window._env_.REACT_APP_BACKEND_URL;
if (!backendUrl) {
    console.warn('REACT_APP_BACKEND_URL is not set. Falling back to default.');
}
console.log(`Backend URL: ${backendUrl}`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
