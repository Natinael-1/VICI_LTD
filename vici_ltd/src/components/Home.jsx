import { useState } from "react";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Home() {
  // 1. Create a memory state for the mobile menu (starts as 'false' or closed)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 1. NAVIGATION BAR */}
      <nav className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-green-700 tracking-wider">
            VICI LTD.
          </div>

          {/* Desktop Menu (Hidden on mobile) */}
          <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <Link to="/" className="hover:text-green-600">
              Our Story
            </Link>
            <Link to="/" className="hover:text-green-600">
              Fresh Mushrooms
            </Link>
            <Link to="/" className="hover:text-green-600">
              Mushroom Tubes
            </Link>
            <Link to="/" className="hover:text-green-600">
              Contact Us
            </Link>
          </div>

          <div className="hidden md:block">
            <button className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition">
              Order via WhatsApp
            </button>
          </div>

          {/* Hamburger Menu Button (Only shows on mobile) */}
          <button
            className="md:hidden text-green-700 text-3xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* HTML code for the 3-line hamburger icon */}
            &#9776;
          </button>
        </div>

        {/* 2. MOBILE DROPDOWN MENU */}
        {/* If isMobileMenuOpen is true, render this box */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 bg-green-50 p-4 rounded-lg text-center shadow-inner">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-green-600"
            >
              Our Story
            </Link>
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-green-600"
            >
              Fresh Mushrooms
            </Link>
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-green-600"
            >
              Mushroom Tubes
            </Link>
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-green-600"
            >
              Contact Us
            </Link>
            <button className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition w-full">
              Order via WhatsApp
            </button>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative bg-green-50 px-6 py-20 text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Premium Mushrooms for{" "}
          <span className="text-green-600">Your Health</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          We provide high-value, locally cultivated fresh mushrooms and
          ready-to-grow mushroom tubes to power your business and nourish your
          family.
        </p>
        <div className="space-x-4">
          <button className="bg-green-600 text-white px-8 py-3 rounded shadow-lg hover:bg-green-700 font-bold transition">
            Explore Products
          </button>
          <button className="bg-white text-green-600 border border-green-600 px-8 py-3 rounded shadow hover:bg-green-50 font-bold transition">
            Learn to Grow
          </button>
        </div>
      </header>

      {/* 3. FEATURE GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Card 1 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              [Image: Fresh Mushrooms]
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Fresh Harvest
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Proudly grown and packed to give you the freshest flavors every
              time.
            </p>
            <Link
              to="/"
              className="text-green-600 font-semibold text-sm hover:underline"
            >
              See Details &rarr;
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              [Image: Mushroom Tubes]
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Mushroom Tubes
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              High-yield tubes ready for cultivation in your own space.
            </p>
            <Link
              to="/"
              className="text-green-600 font-semibold text-sm hover:underline"
            >
              See Details &rarr;
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              [Image: Training]
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Expert Training
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn the secrets to successful mushroom cultivation with our
              team.
            </p>
            <Link
              to="/"
              className="text-green-600 font-semibold text-sm hover:underline"
            >
              See Details &rarr;
            </Link>
          </div>

          {/* Card 4 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
              [Image: Delivery]
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Bulk Supply
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Consistent supply chains for local businesses and markets.
            </p>
            <Link
              to="/"
              className="text-green-600 font-semibold text-sm hover:underline"
            >
              See Details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FOOTER BANNER */}
      <footer className="bg-slate-900 text-white text-center py-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold tracking-widest mb-6">
            Quality MUSHROOMS FOR HEALTH
          </h2>

          <div className="flex space-x-6">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
            >
              {/* Changed from <Facebook /> to <FaFacebook /> */}
              <FaFacebook size={24} />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
            >
              {/* Changed from <Instagram /> to <FaInstagram /> */}
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
