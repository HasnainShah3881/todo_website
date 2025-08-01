import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DataContext from "../datacontext.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </DataProvider>
  </BrowserRouter>
);
