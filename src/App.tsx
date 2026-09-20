import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./components/Home";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
    </>
  );
}

export default App;
