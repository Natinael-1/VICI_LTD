import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Custom Self-Contained Inline SVG Icons (Zero dependency issues)
const ChartPieIcon = ({ className = "w-5 h-5" }) => (
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
      d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.488 9H15V3.512A9.025 9.003 0 0120.488 9z"
    />
  </svg>
);

const ClipboardIcon = ({ className = "w-5 h-5" }) => (
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
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const AddressBookIcon = ({ className = "w-5 h-5" }) => (
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
      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
    />
  </svg>
);

const TagsIcon = ({ className = "w-5 h-5" }) => (
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
      d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zM9 16H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V6h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2zm4 8h-2v-2h2v2"
    />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }) => (
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
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const SignOutIcon = ({ className = "w-5 h-5" }) => (
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
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const PhoneIcon = ({ className = "w-4 h-4" }) => (
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
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const EnvelopeIcon = ({ className = "w-4 h-4" }) => (
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
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ChatBubbleIcon = ({ className = "w-4 h-4" }) => (
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
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [dateFilter, setDateFilter] = useState("all"); // Options: 'all', 'today', 'week', 'month'
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Dynamic Audit logs reflecting actual date parameters (Current Anchor: 2026-06-18)
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 101,
      staff: "Isheja Wizy",
      action: "Sale",
      customer: "Mugisha Patrick",
      detail: "50kg Fresh Mushrooms",
      amount: 100000,
      type: "credit",
      status: "valid",
      date: "2026-06-18",
      time: "14:30",
    },
    {
      id: 102,
      staff: "Isheja Wizy",
      action: "Inventory",
      customer: "-",
      detail: "Added 100kg Ipamba",
      amount: 50000,
      type: "debit",
      status: "valid",
      date: "2026-06-18",
      time: "09:15",
    },
    {
      id: 103,
      staff: "Isheja Wizy",
      action: "Sale",
      customer: "Walk-in Customer",
      detail: "10x Mushroom Tubes",
      amount: 7000,
      type: "credit",
      status: "flagged_deleted",
      date: "2026-06-17",
      time: "16:45",
    },
    {
      id: 104,
      staff: "Isheja Wizy",
      action: "Sale",
      customer: "Aline Uwineza",
      detail: "15kg Fresh Mushrooms",
      amount: 30000,
      type: "credit",
      status: "valid",
      date: "2026-06-14",
      time: "11:20",
    },
    {
      id: 105,
      staff: "Isheja Wizy",
      action: "Inventory",
      customer: "-",
      detail: "Added 10kg Umurama",
      amount: 10000,
      type: "debit",
      status: "valid",
      date: "2026-06-12",
      time: "15:00",
    },
    {
      id: 106,
      staff: "Isheja Wizy",
      action: "Sale",
      customer: "Hotel Kigali",
      detail: "225x Mushroom Tubes",
      amount: 157500,
      type: "credit",
      status: "valid",
      date: "2026-06-10",
      time: "10:00",
    },
    {
      id: 107,
      staff: "Isheja Wizy",
      action: "Inventory",
      customer: "-",
      detail: "Used 25kg Ishwagara",
      amount: 7500,
      type: "debit",
      status: "valid",
      date: "2026-06-08",
      time: "14:15",
    },
    {
      id: 108,
      staff: "Isheja Wizy",
      action: "Sale",
      customer: "Hotel Kigali",
      detail: "146kg Fresh Mushrooms",
      amount: 292000,
      type: "credit",
      status: "valid",
      date: "2026-06-05",
      time: "12:00",
    },
  ]);

  // Master product catalog
  const catalog = [
    {
      id: "p1",
      type: "Product",
      name: "Fresh Mushrooms (kg)",
      basePrice: 2000,
    },
    { id: "p2", type: "Product", name: "Mushroom Tubes", basePrice: 700 },
    { id: "m1", type: "Material", name: "Ipamba (kg)", basePrice: "Variable" },
    { id: "m2", type: "Material", name: "Umurama (kg)", basePrice: "Variable" },
  ];

  // System personnel parameters
  const personnel = [
    {
      id: 1,
      name: "Emmanuel",
      email: "emmanuel@viciltd.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Isheja Wizy",
      email: "ishejawizy@gmail.com",
      role: "Staff",
      status: "Active",
    },
  ];

  // Customer Directory with specific contact and location parameters
  const customers = [
    {
      id: "c1",
      name: "Mugisha Patrick",
      phone: "+250781234567",
      email: "patrick.m@example.com",
      address: "Gasabo, Kigali",
      lifetimeValue: 180000,
      lastPurchase: "2026-06-18",
    },
    {
      id: "c2",
      name: "Aline Uwineza",
      phone: "+250739876543",
      email: "-",
      address: "Nyarugenge, Kigali",
      lifetimeValue: 45000,
      lastPurchase: "2026-06-14",
    },
    {
      id: "c3",
      name: "Hotel Kigali",
      phone: "+250795551122",
      email: "procurement@hotel.rw",
      address: "Kicukiro, Kigali",
      lifetimeValue: 450000,
      lastPurchase: "2026-06-10",
    },
  ];

  const handleLogout = () => {
    navigate("/staff-login", { replace: true });
  };

  // ==========================================
  // DYNAMIC CALCULATIONS & FILTERS
  // ==========================================

  // Date filtering logic helper
  const filterLogsByDate = (logsArray) => {
    const todayStr = "2026-06-18"; // Static anchor to coordinate with current date
    const today = new Date(todayStr);

    return logsArray.filter((log) => {
      if (dateFilter === "all") return true;
      const logDate = new Date(log.date);
      const timeDiff = today.getTime() - logDate.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (dateFilter === "today") {
        return log.date === todayStr;
      } else if (dateFilter === "week") {
        return diffDays <= 7;
      } else if (dateFilter === "month") {
        return diffDays <= 30;
      }
      return true;
    });
  };

  const filteredLogs = filterLogsByDate(auditLogs);

  // Financial summation based on filtered log items
  const activeRevenue = filteredLogs
    .filter((log) => log.action === "Sale" && log.status === "valid")
    .reduce((sum, item) => sum + item.amount, 0);

  const activeExpenses = filteredLogs
    .filter((log) => log.action === "Inventory" && log.type === "debit")
    .reduce((sum, item) => sum + item.amount, 0);

  const activeNetProfit = activeRevenue - activeExpenses;

  // Safe resolver function to mutate log records correctly through React state hooks
  const resolveDeletedAuditLog = (id, approve) => {
    if (approve) {
      setAuditLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.id === id
            ? { ...log, status: "approved_deleted", amount: 0 }
            : log,
        ),
      );
    } else {
      setAuditLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.id === id ? { ...log, status: "valid" } : log,
        ),
      );
    }
  };

  // Create dynamic SVG bars from the last 7 days of sales activity
  const last7DaysSalesData = () => {
    const dates = [
      "2026-06-12",
      "2026-06-13",
      "2026-06-14",
      "2026-06-15",
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
    ];
    return dates.map((dt) => {
      const dailySum = auditLogs
        .filter(
          (log) =>
            log.date === dt && log.action === "Sale" && log.status === "valid",
        )
        .reduce((sum, current) => sum + current.amount, 0);
      return { date: dt, amount: dailySum };
    });
  };

  const chartData = last7DaysSalesData();
  const maxChartAmount = Math.max(...chartData.map((d) => d.amount), 50000);

  // Customer Filtering logic
  const filteredCustomers = customers.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(query) ||
      client.address.toLowerCase().includes(query) ||
      client.phone.includes(query)
    );
  });

  // Global SMS broadcast address formulation
  const allPhonesJoined = customers.map((c) => c.phone).join(",");
  const globalSmsTemplate =
    "Hello from Vici Farms! We have a fresh harvest of premium organic mushrooms arriving this afternoon. Let us know if we can schedule a delivery to your address today!";
  const globalSmsUrl = `sms:${allPhonesJoined}?body=${encodeURIComponent(globalSmsTemplate)}`;

  // Determine if the dynamic Date Picker filters are needed on the current screen
  const isDateFilterNeeded = activeTab === "overview" || activeTab === "audit";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-800">
      {/* SIDEBAR NAVIGATION BAR */}
      <aside className="w-full md:w-64 bg-[#015c3a] text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 text-center border-b border-green-800 bg-slate-900 md:bg-transparent">
          <h2 className="text-2xl font-extrabold tracking-widest text-vici-vibrant">
            VICI LTD
          </h2>
          <p className="text-xs text-green-200 mt-1 uppercase tracking-widest font-semibold">
            Command Center
          </p>
        </div>

        {/* Dynamic Sidebar selectors */}
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible grow p-2 md:p-4 gap-2 bg-[#015c3a]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "overview" ? "bg-vici-vibrant text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <ChartPieIcon /> <span>Overview</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("audit");
            }}
            className={`shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "audit" ? "bg-vici-vibrant text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <ClipboardIcon /> <span>Audit Trail</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("customers");
            }}
            className={`shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "customers" ? "bg-vici-vibrant text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <AddressBookIcon /> <span>Customer CRM</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "catalog" ? "bg-vici-vibrant text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <TagsIcon /> <span>Catalog & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab("personnel")}
            className={`shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "personnel" ? "bg-vici-vibrant text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <UsersIcon /> <span>Personnel</span>
          </button>
        </nav>

        <div className="p-4 border-t border-green-800 hidden md:block bg-slate-900/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition font-semibold"
          >
            <SignOutIcon /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEW AREA */}
      <main className="grow p-4 md:p-8 h-screen overflow-y-auto">
        {/* Dynamic header elements */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 capitalize">
              {activeTab === "overview"
                ? "Executive Dashboard"
                : activeTab.replace("-", " ")}
            </h1>
            <p className="text-gray-500 mt-1 text-xs md:text-sm">
              Real-time parameters for VICI Limited operations.
            </p>
          </div>

          {/* Quick Date Range Filter: CONDITIONAL RENDERING FIXED */}
          {isDateFilterNeeded && (
            <div className="bg-white border border-gray-200 rounded-xl p-1 flex shadow-sm">
              {["all", "today", "week", "month"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setDateFilter(opt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize ${dateFilter === opt ? "bg-[#015c3a] text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* --- TAB 1: FINANCIAL OVERVIEW & ACTIVE CHARTS --- */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Live Financial Parameter summation widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
                <h4 className="text-gray-400 font-bold mb-1 text-xs uppercase tracking-wider">
                  Total Sales
                </h4>
                <p className="text-3xl font-black text-gray-800">
                  {activeRevenue.toLocaleString()}{" "}
                  <span className="text-xs text-gray-400 font-bold">RWF</span>
                </p>
                <span className="text-xs text-gray-400 font-bold mt-1 inline-block">
                  Revenue generated in active range
                </span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-500">
                <h4 className="text-gray-400 font-bold mb-1 text-xs uppercase tracking-wider">
                  Inventory Outflow
                </h4>
                <p className="text-3xl font-black text-red-500">
                  {activeExpenses.toLocaleString()}{" "}
                  <span className="text-xs text-red-400 font-bold">RWF</span>
                </p>
                <span className="text-xs text-gray-400 font-bold mt-1 inline-block">
                  Cost of stock arrival items
                </span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-[#015c3a]">
                <h4 className="text-gray-400 font-bold mb-1 text-xs uppercase tracking-wider">
                  Estimated Profit
                </h4>
                <p
                  className={`text-3xl font-black ${activeNetProfit >= 0 ? "text-[#015c3a]" : "text-red-600"}`}
                >
                  {activeNetProfit.toLocaleString()}{" "}
                  <span className="text-sm text-gray-400 font-normal">RWF</span>
                </p>
              </div>
            </div>

            {/* Real SVG bar chart displaying weekly metrics */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Weekly Performance Metrics
                  </h3>
                  <p className="text-xs text-gray-400">
                    Total transaction values plotted by staff logged dates
                  </p>
                </div>
                <span className="text-xs bg-emerald-50 text-[#015c3a] px-3 py-1 rounded-full font-bold border border-green-100">
                  Live SVG Render
                </span>
              </div>

              {/* Dynamic SVG chart drawing structure */}
              <div className="w-full overflow-x-auto">
                <svg className="w-full min-w-125 h-64" viewBox="0 0 700 240">
                  {/* Grid Lines */}
                  <line
                    x1="50"
                    y1="40"
                    x2="680"
                    y2="40"
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                  <line
                    x1="50"
                    y1="90"
                    x2="680"
                    y2="90"
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                  <line
                    x1="50"
                    y1="140"
                    x2="680"
                    y2="140"
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                  <line
                    x1="50"
                    y1="190"
                    x2="680"
                    y2="190"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />

                  {/* Dynamic Bars mapping */}
                  {chartData.map((d, index) => {
                    const barWidth = 40;
                    const spacing = 90;
                    const xCoord = 70 + index * spacing;
                    const barHeight =
                      d.amount > 0 ? (d.amount / maxChartAmount) * 140 : 0;
                    const yCoord = 190 - barHeight;

                    return (
                      <g key={index} className="group cursor-pointer">
                        {/* Interactive hover tooltip simulation */}
                        <rect
                          x={xCoord}
                          y={yCoord}
                          width={barWidth}
                          height={barHeight}
                          fill={
                            index === chartData.length - 1
                              ? "#10d15f"
                              : "#015c3a"
                          }
                          rx="4"
                          className="transition-all duration-300 hover:opacity-85"
                        />
                        {/* Quantity label print on top of the bar */}
                        {d.amount > 0 && (
                          <text
                            x={xCoord + barWidth / 2}
                            y={yCoord - 8}
                            textAnchor="middle"
                            className="text-[10px] font-bold fill-gray-600 font-sans"
                          >
                            {d.amount >= 1000
                              ? `${(d.amount / 1000).toFixed(1)}k`
                              : d.amount}
                          </text>
                        )}
                        {/* Day indicator label */}
                        <text
                          x={xCoord + barWidth / 2}
                          y="210"
                          textAnchor="middle"
                          className="text-[11px] font-bold fill-gray-400 font-sans uppercase"
                        >
                          {d.date.substring(5)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: AUDIT TRAIL LOGS (With dynamic dates) --- */}
        {activeTab === "audit" && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Timestamp / Date</th>
                    <th className="py-4 px-6">Staff Member</th>
                    <th className="py-4 px-6">Action</th>
                    <th className="py-4 px-6">Customer Name</th>
                    <th className="py-4 px-6">Transaction Detail</th>
                    <th className="py-4 px-6">Financial Value</th>
                    <th className="py-4 px-6 text-center">Status Control</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className={`border-b border-gray-100 transition-all ${
                        log.status === "flagged_deleted"
                          ? "bg-red-50/70 hover:bg-red-100/60"
                          : log.status === "approved_deleted"
                            ? "opacity-45 bg-gray-100 line-through"
                            : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-800 text-sm block">
                          {log.date}
                        </span>
                        <span className="text-xs text-gray-400 block">
                          {log.time}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-800 text-sm">
                        {log.staff}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${log.action === "Sale" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-orange-50 text-orange-700 border border-orange-100"}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-medium text-sm">
                        {log.customer}
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">
                        {log.detail}
                      </td>
                      <td
                        className={`py-4 px-6 font-bold text-sm ${log.type === "credit" ? "text-[#015c3a]" : "text-red-500"}`}
                      >
                        {log.type === "credit" ? "+" : "-"}{" "}
                        {log.amount.toLocaleString()} RWF
                      </td>
                      <td className="py-4 px-6 text-center">
                        {log.status === "flagged_deleted" ? (
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() =>
                                resolveDeletedAuditLog(log.id, true)
                              }
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center shadow-sm"
                            >
                              <CheckIcon className="mr-1" /> Approve Deletion
                            </button>
                            <button
                              onClick={() =>
                                resolveDeletedAuditLog(log.id, false)
                              }
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        ) : log.status === "approved_deleted" ? (
                          <span className="text-red-600 font-bold text-xs uppercase bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
                            Deleted (Confirmed)
                          </span>
                        ) : (
                          <span className="text-[#015c3a] text-xs font-bold bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                            Active Record
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* --- TAB 3: CUSTOMER CRM (With targeted templates) --- */}
        {activeTab === "customers" && (
          <section className="space-y-6">
            {/* Search filter and Broadcast tools */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customer, location or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#015c3a] focus:ring-2 focus:ring-green-50 font-medium text-sm"
                />
              </div>

              {/* Broadcast controls */}
              <div className="flex space-x-2 w-full md:w-auto">
                <a
                  href={globalSmsUrl}
                  className="bg-slate-800 text-white rounded-xl px-5 py-2.5 text-xs font-bold hover:bg-slate-900 transition flex items-center justify-center space-x-1 shadow-sm w-full md:w-auto"
                >
                  <PhoneIcon className="w-3.5 h-3.5" />{" "}
                  <span>SMS Broadcast All</span>
                </a>
              </div>
            </div>

            {/* CUSTOMER CARD RE-DESIGN: FIXED AND HIGHLY COMPACT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filteredCustomers.map((client) => {
                const isEmailDisabled = client.email === "-";

                // Formulate custom contact message contents to send straight to clients
                const msgTemplate = `Hello ${client.name}, thank you for choosing VICI Limited! We hope you enjoyed your fresh harvest of premium mushrooms. Let us know if you would like to book a subsequent delivery!`;
                const encodedMsg = encodeURIComponent(msgTemplate);

                return (
                  <div
                    key={client.id}
                    className="border border-gray-100 rounded-2xl p-5 hover:shadow-xl transition bg-white relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#015c3a]"></div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-extrabold text-gray-800 text-lg leading-tight">
                          {client.name}
                        </h4>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-gray-500 uppercase">
                          {client.address.split(",")[0]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-4">
                        {client.address}
                      </p>

                      <div className="space-y-2 mb-6 border-b border-gray-50 pb-4 text-sm font-medium">
                        <p className="text-gray-600 flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />{" "}
                          {client.phone}
                        </p>
                        <p
                          className={`flex items-center ${isEmailDisabled ? "text-gray-300 italic" : "text-gray-600"}`}
                        >
                          <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />{" "}
                          {client.email}
                        </p>
                      </div>
                    </div>

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
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${user.role === "Admin" ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}
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