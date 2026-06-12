import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

// We will build these detailed pages in the next steps!
import ViciFarms from "./components/ViciFarms";
import ViciBeverages from "./components/ViciBeverages";
import AdminLogin from "./components/ViciStaffLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Level 1: The Parent Company */}
        <Route path="/" element={<Home />} />
        {/* Level 2: The Sub-Brands */}
        <Route path="/farms" element={<ViciFarms />} />
        <Route path="/beverages" element={<ViciBeverages />} />
        <Route path="/staff-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
