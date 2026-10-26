import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { mocks } from "./graphql/mock";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockedProvider>
  </React.StrictMode>
);