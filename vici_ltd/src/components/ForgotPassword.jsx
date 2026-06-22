import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const KeyIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 7a2 2 0 012 2m-5-2a2 2 0 012-2m-5 10a7 7 0 119.227-2.617M11 13H9l-2 2H5l-1 1v2a1 1 0 001 1h3v-1l1-1h1a1 1 0 001-1v-1l1-1h1a1 1 0 001-1v-2"
    />
  </svg>
);

const ArrowLeftIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      // 1. Post request payload to Python/Flask password recovery API endpoint
      const response = await fetch('http://127.0.0.1:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ email: email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "This email address is not registered in our system.");
      }

      if (data.success === true) {
        setMessage(data.message || "A password reset link has been successfully dispatched to your email address.");
      } else {
        setError(data.message || "Failed to initiate password reset.");
      }

    } catch (err) {
      setError(err.message || "Connection failed. Please check your internet and try again.");
      console.error(`Error occurred: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#015c3a]"></div>

        <div className="mb-6">
          <Link
            to="/staff-login"
            className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-[#015c3a] transition-all"
          >
            <ArrowLeftIcon className="mr-1.5" /> Back to Staff Login
          </Link>
        </div>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-16 bg-emerald-50 text-[#015c3a] rounded-full flex items-center justify-center mb-4 shadow-sm border border-green-100">
            <KeyIcon />
          </div>
          <h2 className="text-2xl font-black text-gray-800">Reset Password</h2>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">
            Enter your email below to request a secure link to reset your
            credentials.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100 animate-fadeIn">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm mb-6 border border-emerald-100 leading-relaxed text-center font-medium animate-fadeIn">
            {message}
          </div>
        )}

        <form onSubmit={handleResetRequest} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
              Registered Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@viciltd.com"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#015c3a] focus:ring-2 focus:ring-green-50 transition text-sm font-medium disabled:bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-3 rounded-lg transition shadow-md ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#015c3a] hover:bg-emerald-800"}`}
          >
            {isLoading ? "Sending request..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
