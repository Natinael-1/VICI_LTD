import { useState, useEffect } from "react";
import { useNavigate, useInRouterContext, HashRouter } from "react-router-dom";

// =========================================================================
// 🎨 HIGH-PERFORMANCE CUSTOM INLINE SVG ICONS
// =========================================================================
const ChartPieIcon = ({ className = "w-5 h-5 shrink-0" }) => (
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
      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
    />
  </svg>
);

const ClipboardIcon = ({ className = "w-5 h-5 shrink-0" }) => (
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const AddressBookIcon = ({ className = "w-5 h-5 shrink-0" }) => (
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
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const TagsIcon = ({ className = "w-5 h-5 shrink-0" }) => (
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
      d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5 shrink-0" }) => (
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

const SignOutIcon = ({ className = "w-5 h-5 shrink-0" }) => (
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

const PhoneIcon = ({ className = "w-4 h-4 text-gray-400 shrink-0" }) => (
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

const EnvelopeIcon = ({ className = "w-4 h-4 text-gray-400 shrink-0" }) => (
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

const SearchIcon = ({ className = "w-5 h-5 text-gray-400" }) => (
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

// Absolute base address for Kenia's Flask server running locally
const API_BASE_URL = "http://localhost:5000";

// =========================================================================
// 🚀 MAIN WORKSPACE INNER RENDERING ENGINE
// =========================================================================
function AdminDashboardInner() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic metrics states (Fetches from central API envelope)
  const [auditLogs, setAuditLogs] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Reusable function to fetch analytical metrics from Kenia's Flask backend
  const fetchMetricsEnvelope = async () => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/admin/metrics`);
      if (response.ok) {
        const payload = await response.json();
        setAuditLogs(payload.auditLogs || []);
        setPersonnel(payload.personnel || []);
        setCustomers(payload.customers || []);
      } else {
        setError("Failed to resolve live analytical metrics from SQLite.");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      setError("Cannot reach VICI database server. Is Kenia's backend active?");
    } finally {
      setIsLoading(false);
    }
  };

  // Run database query on startup using safe timeout ticks to avoid render warnings
  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      fetchMetricsEnvelope();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Pricing Catalog Details (Standard reference, remains local)
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

  const handleLogout = () => {
    navigate("/staff-login");
  };

  // Helper logic to filter audit logs by chosen timeline
  const filterLogsByDate = (logsArray) => {
    const todayStr = "2026-06-18";
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

  // Calculate financials dynamically from SQLite log entries
  const activeRevenue = filteredLogs
    .filter((log) => log.action === "Sale" && log.status === "valid")
    .reduce((sum, item) => sum + item.amount, 0);

  const activeExpenses = filteredLogs
    .filter((log) => log.action === "Inventory" && log.type === "debit")
    .reduce((sum, item) => sum + item.amount, 0);

  const activeNetProfit = activeRevenue - activeExpenses;

  // Resolves pending deletes over the network using Kenia's PATCH route
  const resolveDeletedAuditLog = async (id, approve) => {
    try {
      setError("");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/resolve-log/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approve }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // State Synchronization: Re-fetch entire metrics envelope to align UI calculations instantly
        await fetchMetricsEnvelope();
      } else {
        setError(data.message || "Failed to commit decision to database.");
      }
    } catch (err) {
      console.error("Conflict Management Error:", err);
      setError("Network error. Action not saved to database.");
    }
  };

  // Compile real sales metrics grouped by dates for custom SVG plotting
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

  // Dynamic filter matching search queries inside client CRM cards
  const filteredCustomers = customers.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(query) ||
      client.address.toLowerCase().includes(query) ||
      client.phone.includes(query)
    );
  });

  // Compose automated SMS broadcast URL link
  const allPhonesJoined = customers.map((c) => c.phone).join(",");
  const globalSmsTemplate =
    "Hello from Vici Farms! We have a fresh harvest of premium organic mushrooms arriving this afternoon. Let us know if we can schedule a delivery to your address today!";
  const globalSmsUrl = `sms:${allPhonesJoined}?body=${encodeURIComponent(globalSmsTemplate)}`;

  const isDateFilterNeeded = activeTab === "overview" || activeTab === "audit";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-800">
      {/* 1. SIDEBAR CONTROLLER */}
      <aside className="w-full md:w-64 bg-[#015c3a] text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 text-center border-b border-green-800 bg-slate-900 md:bg-transparent">
          <h2 className="text-2xl font-extrabold tracking-widest text-[#10d15f]">
            VICI LTD
          </h2>
          <p className="text-xs text-green-200 mt-1 uppercase tracking-widest font-semibold">
            Command Center
          </p>
        </div>

        {/* Dynamic Navigation Selectors */}
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible flex-grow p-2 md:p-4 gap-2 bg-[#015c3a]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "overview" ? "bg-[#10d15f] text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <ChartPieIcon /> <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`flex-shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "audit" ? "bg-[#10d15f] text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <ClipboardIcon /> <span>Audit Trail</span>
          </button>

          <button
            onClick={() => setActiveTab("customers")}
            className={`flex-shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "customers" ? "bg-[#10d15f] text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <AddressBookIcon /> <span>Customer CRM</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`flex-shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "catalog" ? "bg-[#10d15f] text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <TagsIcon /> <span>Catalog & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab("personnel")}
            className={`flex-shrink-0 flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "personnel" ? "bg-[#10d15f] text-white font-bold shadow-md" : "text-gray-200 hover:bg-emerald-800"}`}
          >
            <UsersIcon /> <span>Personnel</span>
          </button>
        </nav>

        <div className="p-4 border-t border-green-800 hidden md:block bg-slate-900/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition font-semibold"
          >
            <SignOutIcon /> <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. DYNAMIC WORKSPACE */}
      <main className="flex-grow p-4 md:p-8 h-screen overflow-y-auto">
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

          {/* Quick Date Range Filter */}
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

        {/* Global Connection Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-fadeIn">
            ⚠️ {error}
          </div>
        )}

        {/* Global Loading Spinner state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-transparent border-[#015c3a]"></div>
            <p className="text-gray-400 font-bold text-sm">
              Querying SQLite central filing cabinet...
            </p>
          </div>
        ) : (
          <>
            {/* --- TAB 1: FINANCIAL OVERVIEW & ACTIVE CHARTS --- */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Live Financial Parameter Summation Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
                    <h4 className="text-gray-400 font-bold mb-1 text-xs uppercase tracking-wider">
                      Total Sales
                    </h4>
                    <p className="text-3xl font-black text-gray-800">
                      {activeRevenue.toLocaleString()}{" "}
                      <span className="text-xs text-gray-400 font-bold">
                        RWF
                      </span>
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
                      <span className="text-xs text-red-400 font-bold">
                        RWF
                      </span>
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
                      <span className="text-sm text-gray-400 font-normal">
                        RWF
                      </span>
                    </p>
                  </div>
                </div>

                {/* Live Weekly Performance SVG Bar Chart */}
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

                  {/* SVG Canvas drawing structure */}
                  <div className="w-full overflow-x-auto">
                    <svg
                      className="w-full min-w-[500px] h-64"
                      viewBox="0 0 700 240"
                    >
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

                      {chartData.map((d, index) => {
                        const barWidth = 40;
                        const spacing = 90;
                        const xCoord = 70 + index * spacing;
                        const barHeight =
                          d.amount > 0 ? (d.amount / maxChartAmount) * 140 : 0;
                        const yCoord = 190 - barHeight;

                        return (
                          <g key={index} className="group cursor-pointer">
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

            {/* --- TAB 2: AUDIT TRAIL LOGS --- */}
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
                        <th className="py-4 px-6 text-center">
                          Status Control
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log) => (
                        <tr
                          key={log.id}
                          className={`border-b border-gray-100 transition-all ${
                            log.status === "flagged_deleted"
                              ? "bg-red-50/70 hover:bg-red-100/60 animate-pulse"
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
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center shadow-sm transition"
                                >
                                  <CheckIcon className="mr-1" /> Approve
                                  Deletion
                                </button>
                                <button
                                  onClick={() =>
                                    resolveDeletedAuditLog(log.id, false)
                                  }
                                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold transition"
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

            {/* --- TAB 3: CUSTOMER CRM --- */}
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
                      <PhoneIcon className="w-3.5 h-3.5 text-white" />{" "}
                      <span>SMS Broadcast All</span>
                    </a>
                  </div>
                </div>

                {/* Dynamic CRM Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCustomers.length === 0 ? (
                    <p className="text-gray-400 text-center col-span-3 py-12">
                      No customer records matching query.
                    </p>
                  ) : (
                    filteredCustomers.map((client) => {
                      const isEmailDisabled = client.email === "-";
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
                                <PhoneIcon className="mr-2 text-gray-400 w-4 h-4 shrink-0" />{" "}
                                {client.phone}
                              </p>
                              <p
                                className={`flex items-center ${isEmailDisabled ? "text-gray-300 italic" : "text-gray-600"}`}
                              >
                                <EnvelopeIcon className="mr-2 text-gray-400 w-4 h-4 shrink-0" />{" "}
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

                            {/* Targeted Individual CRM Messaging Actions */}
                            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                              <a
                                href={`sms:${client.phone}?body=${encodedMsg}`}
                                className="bg-slate-100 text-slate-800 rounded-lg py-2 text-xs font-bold text-center hover:bg-slate-200 transition flex items-center justify-center space-x-1"
                              >
                                <PhoneIcon className="w-3.5 h-3.5 text-gray-600" />{" "}
                                <span>SMS</span>
                              </a>

                              <a
                                href={`https://wa.me/${client.phone.replace("+", "")}?text=${encodedMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#10d15f] text-white rounded-lg py-2 text-xs font-bold text-center hover:bg-[#015c3a] transition flex items-center justify-center space-x-1 shadow-sm"
                              >
                                <ChatBubbleIcon className="w-3.5 h-3.5 text-white" />{" "}
                                <span>WhatsApp</span>
                              </a>

                              {!isEmailDisabled ? (
                                <a
                                  href={`mailto:${client.email}?subject=VICI%20Limited%20Follow-up&body=${encodedMsg}`}
                                  className="bg-blue-50 text-blue-800 rounded-lg py-2 text-xs font-bold text-center hover:bg-blue-100 transition flex items-center justify-center space-x-1 border border-blue-100"
                                >
                                  <EnvelopeIcon className="w-3.5 h-3.5 text-blue-600" />{" "}
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
                    })
                  )}
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
                            <span className="text-[#10d15f] font-bold text-xs bg-green-50 border border-green-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
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
          </>
        )}
      </main>
    </div>
  );
}

// =========================================================================
// 🚀 CONTEXT PROTECTION BOUNCER: AUTO-DETECTS ROUTERS & WRAPS FALLBACKS
// =========================================================================
export default function AdminDashboard() {
  const isInsideRouter = useInRouterContext();

  if (isInsideRouter) {
    return <AdminDashboardInner />;
  }

  // Standalone mode: Mount with fallback HashRouter provider to prevent crash
  return (
    <HashRouter>
      <AdminDashboardInner />
    </HashRouter>
  );
}
