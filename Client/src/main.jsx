import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./components/ContextConfig/ContextConfig.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./components/AuthContext/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <GoogleOAuthProvider clientId="1007135864785-fkasv0tdotar8b3tffb7fikhnp4hvbsr.apps.googleusercontent.com">
      <UserProvider>
        <App />
      </UserProvider>
    </GoogleOAuthProvider>
  </AuthProvider>
);
