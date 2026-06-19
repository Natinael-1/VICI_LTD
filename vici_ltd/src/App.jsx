import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword.jsx";

// We will build these detailed pages in the next steps!
import ViciFarms from "./components/ViciFarms";
import ViciBeverages from "./components/ViciBeverages";
import StaffLogin from "./components/ViciStaffLogin";
import ProtectedRoute from "./components/RouteProtector";
import StaffDashboard from "./components/StaffDashboard";
import AdminDashboard from "./components/AdminDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Level 1: The Parent Company */}
        <Route path="/" element={<Home />} />
        {/* Level 2: The Sub-Brands */}
        <Route path="/farms" element={<ViciFarms />} />
        <Route path="/beverages" element={<ViciBeverages />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
