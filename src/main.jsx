import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { CartProvider } from "./context/CartContext";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/pages.css";

import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <CartProvider>
                <App />
            </CartProvider>
        </BrowserRouter>
    </React.StrictMode>
);