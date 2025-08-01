import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "../datacontext.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Profile from "./components/pages/Profile.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </DataProvider>
  </BrowserRouter>
);
