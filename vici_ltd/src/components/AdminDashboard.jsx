import React, { useState } from 'react';

// --- SYSTEM ICON COMPONENTS ---
// (If you use Lucide-React or Heroicons, you can swap these out, 
// but these custom SVGs ensure the code runs flawlessly out of the box)
const PhoneIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ChatBubbleIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const EnvelopeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function AdminDashboard() {
  // 1. STATE CONTROLS
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");

  // 2. DATA PIPELINES (Structured exactly to back your mapping layouts)
  const [customers] = useState([
    { id: "VICI-001", name: "Kigali Fresh Distributors", phone: "+250788123456", email: "orders@kigalifresh.rw", lifetimeValue: 4500000, lastPurchase: "2026-06-20" },
    { id: "VICI-002", name: "Gisenyi Agri-Hub", phone: "+250789987654", email: "", lifetimeValue: 1250000, lastPurchase: "2026-06-18" }, // Missing email test case
    { id: "VICI-003", name: "Nyagatare Dairy Cooperative", phone: "+250783111222", email: "info@nyagataredairy.com", lifetimeValue: 8900000, lastPurchase: "2026-06-22" }
  ]);

  const [catalog] = useState([
    { id: "CAT-01", type: "Crop Supply", name: "Premium Habanero Hot Chilies", basePrice: 3500 },
    { id: "CAT-02", type: "Logistics", name: "Cold Storage Transportation Unit", basePrice: "Dynamic Tariff" },
    { id: "CAT-03", type: "Seeds", name: "Hybrid F1 Tomato Seedlings", basePrice: 12000 }
  ]);

  const [personnel] = useState([
    { id: 1, name: "Jean Claude Nshuti", email: "jc.nshuti@viciltd.rw", role: "Admin", status: "Active" },
    { id: 2, name: "Aline Umutoni", email: "a.umutoni@viciltd.rw", role: "Manager", status: "Active" }
  ]);

  // SYSTEM MESSAGING TEXT PIPELINE
  const broadcastMessage = "Hello from VICI Limited! Your order status and master catalog updates are now ready for review.";

  // FILTER SEARCH RUNTIME
  const filteredCustomers = customers.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased">
      {/* --- CORE CONTROL HEADER & TAB TOGGLES --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">VICI Operations Management</h1>
            <p className="text-xs text-gray-400">Administration Control Portal Console</p>
          </div>
          
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {["overview", "audit", "customers", "catalog", "personnel"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition capitalize ${
                  activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* --- DASHBOARD DISPLAY CANVAS --- */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* Placeholder Fallbacks for Preliminary Tabs */}
        {(activeTab === "overview" || activeTab === "audit") && (
          <div className="bg-white border border-gray-200 p-6 rounded-2xl text-sm max-w-md">
            <h3 className="font-extrabold text-gray-800 mb-1 capitalize">{activeTab} View Workspace</h3>
            <p className="text-gray-500 text-xs">Pipeline hooks are online. Navigate to Customer CRM, Catalog, or Access Control to verify dynamic loops.</p>
          </div>
        )}

        {/* --- TAB 3: CUSTOMER CRM INTERFACES --- */}
        {activeTab === "customers" && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Client Profiles & Communications</h3>
                <p className="text-xs text-gray-400">Directly pipeline alerts, statements, or market notices</p>
              </div>
              <input
                type="text"
                placeholder="Search CRM entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#015c3a] bg-white shadow-sm w-full sm:w-64 transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((client) => {
                const encodedMsg = encodeURIComponent(broadcastMessage);
                const isEmailDisabled = !client.email || client.email.trim() === "";

                return (
                  <div key={client.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    {/* Header Identifier Top Half */}
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-400 uppercase font-mono font-bold">ID: {client.id}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      </div>
                      <h4 className="font-black text-gray-800 text-base line-clamp-1">{client.name}</h4>
                      <p className="text-xs text-gray-500 font-medium font-mono mt-0.5">{client.phone}</p>
                    </div>

                    {/* Integrated Bottom Half View Layer */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-end mb-6">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider mb-1">
                              Lifetime Value (LTV)
                            </p>
                            <p className="font-black text-[#015c3a] text-lg">
                              {client.lifetimeValue.toLocaleString()} RWF
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider mb-1">
                              Last Order
                            </p>
                            <p className="text-xs font-extrabold text-gray-600">
                              {client.lastPurchase}
                            </p>
                          </div>
                        </div>

                        {/* Targeted individual messaging controls */}
                        <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                          {/* Standard Phone SMS fallback */}
                          <a
                            href={`sms:${client.phone}?body=${encodedMsg}`}
                            className="bg-slate-100 text-slate-800 rounded-lg py-2 text-xs font-bold text-center hover:bg-slate-200 transition flex items-center justify-center space-x-1"
                          >
                            <PhoneIcon className="w-3.5 h-3.5" /> <span>SMS</span>
                          </a>

                          {/* Direct WhatsApp Message builder */}
                          <a
                            href={`https://wa.me/${client.phone.replace("+", "")}?text=${encodedMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-vici-vibrant text-white rounded-lg py-2 text-xs font-bold text-center hover:bg-[#015c3a] transition flex items-center justify-center space-x-1 shadow-sm"
                          >
                            <ChatBubbleIcon className="w-3.5 h-3.5" />{" "}
                            <span>WhatsApp</span>
                          </a>

                          {/* Direct email composer (Disabled if missing) */}
                          {!isEmailDisabled ? (
                            <a
                              href={`mailto:${client.email}?subject=VICI%20Limited%20Follow-up&body=${encodedMsg}`}
                              className="bg-blue-50 text-blue-800 rounded-lg py-2 text-xs font-bold text-center hover:bg-blue-100 transition flex items-center justify-center space-x-1 border border-blue-100"
                            >
                              <EnvelopeIcon className="w-3.5 h-3.5" />{" "}
                              <span>Email</span>
                            </a>
                          ) : (
                            <button
                              disabled
                              className="bg-gray-50 text-gray-300 rounded-lg py-2 text-xs font-bold cursor-not-allowed border border-gray-100"
                            >
                              No Email
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* --- TAB 4: PRICING CATALOG --- */}
        {activeTab === "catalog" && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Master Catalog
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catalog.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-100 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                      {item.type}
                    </span>
                    <h4 className="font-extrabold text-gray-800 text-lg mt-0.5">
                      {item.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-black mb-1">
                      Base Price / Cost
                    </p>
                    {typeof item.basePrice === "number" ? (
                      <span className="text-[#015c3a] font-bold bg-green-50 px-3 py-1 rounded border border-green-200">
                        {item.basePrice.toLocaleString()} RWF
                      </span>
                    ) : (
                      <span className="text-gray-400 font-bold bg-gray-50 px-3 py-1 rounded border border-gray-200">
                        {item.basePrice}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- TAB 5: PERSONNEL ROLES --- */}
        {activeTab === "personnel" && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              System Access Control
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">System Permission Role</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {personnel.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100">
                      <td className="py-4 px-6 font-semibold text-gray-800">
                        {user.name}
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            user.role === "Admin"
                              ? "bg-purple-50 text-purple-700 border border-purple-100"
                              : "bg-blue-50 text-blue-700 border border-blue-100"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-vici-vibrant font-bold text-xs bg-green-50 border border-green-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-[#015c3a] hover:underline text-xs font-extrabold uppercase tracking-wider">
                          Modify Role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
