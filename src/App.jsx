import "./App.css";
import {Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import Profilepage from "./components/pages/Profile";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profilepage />} />
      </Routes>
    </>
  );
}

export default App;
