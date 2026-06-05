import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// We will create this file next time!
// import AdminLogin from './AdminLogin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Public Facing Page */}
        <Route path="/" element={<Home />} />

        {/* The Hidden Staff Backdoor (No links point here!) */}
        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
