import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MockedProvider } from "@apollo/client/testing/react";
import { mocks } from "./graphql/mock";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockedProvider>
  </React.StrictMode>
);
