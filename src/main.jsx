import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "../datacontext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </DataProvider>
  </BrowserRouter>
);
