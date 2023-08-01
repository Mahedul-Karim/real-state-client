import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-s4dbo1r0pze7hsa1.us.auth0.com"
      clientId="8EkRYA4HjSqHyhwEgGwZQdZ8AFLRyj8O"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
      }}
      audience="https://real-estate-server-bice.vercel.app"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
