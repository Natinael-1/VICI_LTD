import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGlassWater } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";

export default function ViciBeverages() {
  // Ensures the page loads at the very top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-vici-light font-sans text-gray-800 flex flex-col">
      {/* 1. DIVISION NAVIGATION */}
      <nav className="p-4 bg-white text-vici-deep sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-vici-vibrant transition"
          >
            <FaArrowLeft />
            <span className="font-semibold tracking-wider text-sm">
              VICI LIMITED
            </span>
          </Link>
          <div className="text-xl font-extrabold tracking-widest text-gray-400">
            VICI Beverages
          </div>
          {/* Empty div to perfectly center the logo */}
          <div className="w-20"></div>
        </div>
      </nav>

      {/* 2. THE TEASER CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="h-24 w-24 bg-white text-vici-deep rounded-full flex items-center justify-center shadow-lg mb-8 animate-bounce">
          <FaGlassWater size={48} />
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-vici-deep mb-6">
          Refreshing Innovations Are{" "}
          <span className="text-vici-vibrant">Brewing.</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
          VICI Limited is expanding. We are currently developing a new line of
          premium, health-focused beverages designed for quality and taste.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="flex items-center justify-center space-x-2 text-vici-vibrant mb-6 font-bold text-lg">
            <MdOutlineTimer size={24} />
            <span>Launching Soon</span>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Be the first to know when we launch. Join the waiting list!
          </p>

          {/* 3. LEAD CAPTURE FORM */}
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter your WhatsApp Number or Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-vici-vibrant focus:ring-2 focus:ring-vici-light transition"
            />
            <button
              type="button"
              className="w-full bg-vici-deep text-white font-bold py-3 rounded-lg hover:bg-slate-900 transition shadow-md"
            >
              Notify Me
            </button>
          </form>
        </div>
      </main>

      {/* 4. SIMPLE FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200 bg-white">
        © 2026 VICI Limited. All rights reserved.
      </footer>
    </div>
  );
}
