import "./App.css";
import {Route, Routes } from "react-router";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
