import './index.css'
import App from './App.jsx'
import { ToastProvider } from './context/ToastContext'
import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";


const CLIENT_ID = "372014749239-703lbphonts6foa1oev1fh5tks1rrppr.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <ToastProvider>
                <App />
            </ToastProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);