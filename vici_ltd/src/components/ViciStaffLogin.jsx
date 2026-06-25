import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock } from "react-icons/fa6";

//Define root url
const API_BASE_URL = "http://localhost:5000/auth";

export default function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // NEW: Tracks if we are waiting for Kenia

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Tell the app we are starting the request

    // The Safety Net!
    try {
      // 1. Send the ticket to the kitchen (Kenia's API)
      /* // UNCOMMENT THIS WHEN KENIA IS READY:
      const response = await fetch('https://api.viciltd.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });
      if (!response.ok){
      throw new Error(`Network Error happened: ${*response.status})
      } else{
        const backendPayload = await response.json();}
      

      // --- TEMPORARY SIMULATION FOR YOUR TESTING ---
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulates a 1.5 second internet delay
      let backendPayload;
      if (email === "ishejawizy@gmail.com" && password === "staff123") {
        backendPayload = { success: true, role: "staff" };
      } else if (email === "emmanuel@viciltd.com" && password === "admin123") {
        backendPayload = { success: true, role: "admin" };
      } else {
        backendPayload = {
          success: false,
          message: "Invalid email or password.",
        };
      }
      // ---------------------------------------------

      // 2. Read the ticket Kenia sent back(This is just simulation not real one.The real one above(response) will be provided by you.)
      if (backendPayload.success === true) {
        localStorage.setItem("vici_user_role", backendPayload.role);
        if (backendPayload.role === "admin") {
          navigate("/admin-dashboard");
        } else if (backendPayload.role === "staff") {
          navigate("/staff-dashboard");
        }
      } else {
        setError(backendPayload.message); // Show Kenia's exact error message
      }
    } catch (err) {
      console.error(`Nerwork Error happened: ${err}`);
      // 3. The Catch block! This only runs if the internet dies or the server crashes.
      setError(
        "Cannot connect to the server. Please check your internet and try again.",
      );
    } finally {
      // 4. No matter what happens (success or fail), stop the loading spinner
      setIsLoading(false);
    }
  };*/
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (response.ok && payload.success) {
        // Save the role token to sessionStorage (our security wristband!)
        sessionStorage.setItem("vici_user_role", payload.role);
        sessionStorage.setItem("vici_user_name", payload.name);

        if (payload.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/staff-dashboard"); // Staff dashboard
        }
      } else {
        setError(payload.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(`Error has occured ${err}`);
      setError("Cannot connect to the server. Is Kenia's backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vici-light flex items-center justify-center font-sans px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-vici-deep text-white rounded-full flex items-center justify-center mb-4 shadow-md">
            <FaLock size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800">
            VICI Secure Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@viciltd.com"
              required
              disabled={isLoading} // Lock input while loading
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-vici-deep focus:ring-2 focus:ring-vici-light transition disabled:bg-gray-100"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-bold text-gray-700">
                Password
              </label>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading} // Lock input while loading
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-vici-deep focus:ring-2 focus:ring-vici-light transition disabled:bg-gray-100"
            />
            {/* NEW: Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-red-500 hover:text-vici-vibrant transition"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* NEW: Dynamic Button changes text when loading */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-3 rounded-lg transition shadow-md mt-4 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-vici-deep hover:bg-slate-900"}`}
          >
            {isLoading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
