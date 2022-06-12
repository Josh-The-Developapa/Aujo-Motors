import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='home' element={<Home />} />
      <Route path='about' element={<About />} />
    </Routes>
  );
}

export default App;
