import React from "react";
import ReactDOMClient from "react-dom/client";
import App from '../src/components/app.jsx';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

const container = document.getElementById('app');

const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/goodies/:productID' element={<App />} />
    </Routes>
  </BrowserRouter>
);

