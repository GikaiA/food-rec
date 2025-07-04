import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Footer from "./Footer/Footer";
import Profile from "./Profile/Profile";
import Recipe from "./Recipe/Recipe";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Footer/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
