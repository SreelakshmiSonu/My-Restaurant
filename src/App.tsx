import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import AboutUs from "./components/AboutUs";
import Gallery from "./components/Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default App;