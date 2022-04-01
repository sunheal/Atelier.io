import React from "react";
import  ReactDOMClient  from "react-dom/client";
import App from '../src/components/app.jsx';

const container = document.getElementById('app');

const root = ReactDOMClient.createRoot(container);

root.render(<App/>);

