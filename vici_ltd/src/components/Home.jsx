import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLeaf, FaGlassWater } from "react-icons/fa6";
import mushroomHand from "../assets/images/mushroom_hand.JPG";
import mushroomSeedling from "../assets/images/mushroom_seedling.JPG";
import mushroomReady from "../assets/images/ready_to_eat_mushrooms.JPG";

// Array of your three real mushroom farming images
const IMAGES = [mushroomHand, mushroomSeedling, mushroomReady];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide timer: changes background every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* 1. NAVIGATION BAR */}
      <nav className="p-6 border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo Area */}
          <div className="text-3xl font-extrabold text-vici-deep tracking-tight">
            VICI Limited
          </div>

          <div className="hidden md:flex space-x-8 text-vici-deep font-semibold">
            <Link to="/about-us" className="hover:text-vici-vibrant transition">
              About Us
            </Link>
            <Link to="/" className="hover:text-vici-vibrant transition">
              Corporate Vision
            </Link>
            <Link to="/farms" className="hover:text-vici-vibrant transition">
              VICI Farms
            </Link>
            <Link
              to="/beverages"
              className="hover:text-vici-vibrant transition"
            >
              VICI Beverages
            </Link>
          </div>

          <div className="hidden md:block">
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-vici-vibrant text-white px-6 py-2.5 rounded-full font-bold hover:bg-green-500 transition shadow-md"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-vici-deep text-3xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            &#9776;
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 bg-vici-light p-4 rounded-lg text-center shadow-inner">
            <Link to="/" className="text-vici-deep font-semibold">
              Corporate Vision
            </Link>
            <Link to="/farms" className="text-vici-deep font-semibold">
              VICI Farms
            </Link>
            <Link to="/beverages" className="text-vici-deep font-semibold">
              VICI Beverages
            </Link>
          </div>
        )}
      </nav>

      {/* 2. CINEMATIC HERO SLIDER SECTION */}
      {/* Outer Window (Viewport) */}
      <header className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-black">
        {/* Sliding Background Layer (The Film Strip) */}
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {IMAGES.map((imgUrl, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${imgUrl}')` }}
            />
          ))}
        </div>

        {/* Static Dark Overlay Mask (Sits on top of background, below text) */}
        <div className="absolute inset-0 bg-black/55 z-0" />

        {/* Static Content Layer (Locked perfectly in place) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl leading-tight">
            Advancing Sustainable Agriculture Through{" "}
            <span className="text-vici-vibrant block md:inline">
              Innovation.
            </span>
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mb-12 text-gray-200 font-light leading-relaxed">
            To become Rwanda's leading supplier of agricultural solutions,
            empowering healthier communities and more productive farming
            systems.
          </p>

          {/* Slide Progress Indicator Bars */}
          <div className="flex space-x-3 mt-4">
            {IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-vici-vibrant"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* 3. OUR SUB-BRANDS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-vici-deep mb-4">
            Our Divisions
          </h2>
          <p className="text-lg text-gray-600">
            Discover how VICI Limited operates across multiple sectors to build
            a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* VICI Farms Card */}
          <Link
            to="/farms"
            className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="h-48 bg-vici-light flex flex-col items-center justify-center text-vici-deep group-hover:bg-vici-vibrant group-hover:text-white transition duration-300">
              <FaLeaf size={64} className="mb-4" />
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-bold text-vici-deep mb-4">
                VICI Farms
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Providing high-quality mushrooms, chili peppers, and innovative
                agricultural products that enhance nutrition and create economic
                opportunities.
              </p>
              <span className="text-vici-vibrant font-bold text-lg group-hover:text-vici-deep transition">
                Explore Agriculture &rarr;
              </span>
            </div>
          </Link>

          {/* VICI Beverages Card */}
          <Link
            to="/beverages"
            className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="h-48 bg-gray-50 flex flex-col items-center justify-center text-gray-400 group-hover:bg-vici-deep group-hover:text-white transition duration-300">
              <FaGlassWater size={64} className="mb-4" />
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-bold text-vici-deep mb-4">
                VICI Beverages
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Expanding our vision into refreshing, innovative drinks. A new
                wave of premium products designed for quality and taste.
              </p>
              <span className="text-gray-500 font-bold text-lg group-hover:text-vici-vibrant transition">
                Discover More &rarr;
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-white text-center py-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold tracking-widest mb-8 text-vici-vibrant">
            VICI LIMITED
          </h2>
          <div className="flex space-x-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-vici-vibrant transition-colors duration-300"
            >
              <FaInstagram size={28} />
            </a>
          </div>
          <p className="mt-8 text-gray-500 text-sm">
            © 2026 VICI Limited. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
