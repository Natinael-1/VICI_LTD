import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { GiMushroom, GiChiliPepper, GiCow } from "react-icons/gi";

export default function ViciFarms() {
  // This ensures the page loads at the very top when someone clicks the link
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* 1. DIVISION NAVIGATION */}
      <nav className="p-4 bg-vici-deep text-white sticky top-0 z-50 shadow-md">
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
          <div className="text-xl font-extrabold tracking-widest">
            VICI Farms
          </div>
          {/* Empty div to perfectly center the logo */}
          <div className="w-20"></div>
        </div>
      </nav>

      {/* 2. FARMS HERO SECTION */}
      <header className="bg-vici-light py-20 px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-vici-deep mb-6">
            Cultivating Excellence in{" "}
            <span className="text-vici-vibrant">Agriculture</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            From high-yield mushroom cultivation to premium chili peppers and
            livestock, VICI Farms is dedicated to empowering healthier
            communities and supporting sustainable farming systems.
          </p>
        </div>
      </header>

      {/* 3. CORE OPERATIONS (The Products) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-vici-deep mb-4">
            Our Core Operations
          </h2>
          <div className="h-1 w-20 bg-vici-vibrant mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Operation 1: Mushrooms */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-green-50 text-vici-deep rounded-full flex items-center justify-center mb-6">
              <GiMushroom size={40} />
            </div>
            <h3 className="text-2xl font-bold text-vici-deep mb-4">
              Mushroom Cultivation
            </h3>
            <p className="text-gray-600 mb-8 flex-grow">
              Our flagship operation. We supply premium fresh mushrooms and
              high-yield ready-to-grow mushroom tubes for local businesses and
              communities.
            </p>
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white border-2 border-vici-deep text-vici-deep py-3 rounded-lg font-bold hover:bg-vici-deep hover:text-white transition"
            >
              Inquire for Bulk Supply
            </a>
          </div>

          {/* Operation 2: Chili Peppers */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
              <GiChiliPepper size={40} />
            </div>
            <h3 className="text-2xl font-bold text-vici-deep mb-4">
              Premium Chili
            </h3>
            <p className="text-gray-600 mb-8 flex-grow">
              Expertly grown chili peppers selected for maximum flavor and heat.
              Perfect for culinary processing and export markets.
            </p>
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white border-2 border-vici-deep text-vici-deep py-3 rounded-lg font-bold hover:bg-vici-deep hover:text-white transition"
            >
              Request a Quote
            </a>
          </div>

          {/* Operation 3: Livestock */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-orange-50 text-orange-800 rounded-full flex items-center justify-center mb-6">
              <GiCow size={40} />
            </div>
            <h3 className="text-2xl font-bold text-vici-deep mb-4">
              Livestock Integration
            </h3>
            <p className="text-gray-600 mb-8 flex-grow">
              Sustainable livestock management designed to work in harmony with
              our crop production, ensuring zero agricultural waste.
            </p>
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white border-2 border-vici-deep text-vici-deep py-3 rounded-lg font-bold hover:bg-vici-deep hover:text-white transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="bg-vici-vibrant text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Partner with VICI Farms?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 font-medium">
          Whether you need bulk supply for your restaurant, or are looking to
          invest in sustainable agriculture, our team is ready to assist you.
        </p>
        <a
          href="https://wa.me/yourphonenumber"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-vici-deep text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-900 transition shadow-xl"
        >
          Chat with Sales on WhatsApp
        </a>
      </section>
    </div>
  );
}
