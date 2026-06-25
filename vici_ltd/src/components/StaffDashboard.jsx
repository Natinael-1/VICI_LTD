import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
  FaCheckCircle,
  FaHistory,
  FaTrash,
  FaEdit,
  FaUserCircle,
  FaCalendarAlt,
  FaPlusCircle,
} from "react-icons/fa";

// 1. ADD THIS LINE RIGHT HERE (Outside your component, below the imports)
// This tells your frontend to talk directly to Kenia's Flask server!
const API_BASE_URL = "http://localhost:5000/api";

// HELPER FUNCTION: Moved OUTSIDE the component to prevent Temporal Dead Zone (TDZ) bugs!
const getTodayDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function StaffDashboard() {
  const navigate = useNavigate(); // RESTORED: This was missing in the top context!
  const [activeTab, setActiveTab] = useState("sales");
  const [notification, setNotification] = useState("");

  // ==========================================
  // STATE: FORMS & DATA
  // ==========================================

  // Sales State
  const [salesData, setSalesData] = useState({
    product: "",
    quantity: "",
    unitPrice: "",
    date: getTodayDateString(),
  });

  // Customer Data State for CRM
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Inventory State
  const [inventoryData, setInventoryData] = useState({
    item: "",
    action: "use",
    quantity: "",
    cost: "",
    date: getTodayDateString(),
  });

  // Hybrid Material Lists State
  const [rawMaterials, setRawMaterials] = useState([
    "Ipamba (kg)",
    "Umurama (kg)",
    "Sondori (kg)",
    "Ishwagara (kg)",
  ]);

  const [isCustomMaterial, setIsCustomMaterial] = useState(false);
  const [customMaterialName, setCustomMaterialName] = useState("");

  // 2. CHANGE THIS: Start with an empty logs array [] so we can load real records from Kenia's DB!
  const [logs, setLogs] = useState([]);

  const products = [
    { id: "p1", name: "Fresh Mushrooms (kg)", price: 2000 },
    { id: "p2", name: "Mushroom Tubes", price: 700 },
  ];

  // ==========================================
  // DYNAMIC CALCULATIONS & HANDLERS
  // ==========================================

  // 3. ADD THIS USEEFFECT BLOCK: Fetches the real database logs on page load!
  useEffect(() => {
    const fetchDatabaseLogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/operations`);
        if (response.ok) {
          const data = await response.json();
          // Assuming Kenia's GET route returns {"success": true, "logs": [...]}
          if (data.logs) {
            setLogs(data.logs);
          }
        }
      } catch (err) {
        console.error("Could not load historical logs from backend:", err);
      }
    };

    window.scrollTo(0, 0);
    fetchDatabaseLogs();
  }, []);

  const handleProductChange = (e) => {
    const selectedName = e.target.value;
    const foundProduct = products.find((p) => p.name === selectedName);
    setSalesData({
      ...salesData,
      product: selectedName,
      unitPrice: foundProduct ? foundProduct.price : "",
    });
  };

  const calculatedTotal =
    salesData.quantity && salesData.unitPrice
      ? parseFloat(salesData.quantity) * parseFloat(salesData.unitPrice)
      : 0;

  const handleMaterialSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "add_new_custom") {
      setIsCustomMaterial(true);
      setInventoryData({ ...inventoryData, item: "" });
    } else {
      setIsCustomMaterial(false);
      setInventoryData({ ...inventoryData, item: selectedValue });
    }
  };

  // 4. REWRITE THIS FUNCTION: Posts a Sale payload matching Kenia's Flask route!
  const handleSalesSubmit = async (e) => {
    e.preventDefault();
    setNotification("Sending to server...");

    const staffName = sessionStorage.getItem("vici_user_name") || "Isheja Wizy";

    // Format the payload exactly how Kenia's python code expects it
    const salePayload = {
      type: "Sale",
      date: salesData.date,
      staff_name: staffName,
      salesData: {
        product: salesData.product,
        quantity: salesData.quantity,
        unitPrice: salesData.unitPrice,
      },
      customerData: {
        name: customerData.name,
        phone: customerData.phone,
        email: customerData.email,
        address: customerData.address,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/operations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salePayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setNotification("Sale successfully saved to VICI database!");

        // Re-fetch log list to show the new record in the table instantly
        const updatedLogsResponse = await fetch(`${API_BASE_URL}/operations`);
        const updatedData = await updatedLogsResponse.json();
        if (updatedData.logs) setLogs(updatedData.logs);

        // Reset forms
        setSalesData({
          product: "",
          quantity: "",
          unitPrice: "",
          date: getTodayDateString(),
        });
        setCustomerData({ name: "", phone: "", email: "", address: "" });
      } else {
        setNotification(data.message || "Server rejected transaction.");
      }
    } catch (err) {
      console.error(err);
      setNotification("Network Error: Could not reach the server.");
    } finally {
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // 5. REWRITE THIS FUNCTION: Posts an Inventory payload matching Kenia's Flask route!
  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    setNotification("Sending to server...");

    const staffName = sessionStorage.getItem("vici_user_name") || "Isheja Wizy";
    const finalizedMaterial = isCustomMaterial
      ? customMaterialName.trim()
      : inventoryData.item;

    if (!finalizedMaterial) {
      alert("Please specify or select a valid material.");
      setNotification("");
      return;
    }

    // Standardize dropdown locally if custom
    if (isCustomMaterial && !rawMaterials.includes(finalizedMaterial)) {
      setRawMaterials([...rawMaterials, finalizedMaterial]);
    }

    // Format the payload exactly how Kenia's python code expects it
    const inventoryPayload = {
      type: "Inventory",
      date: inventoryData.date,
      staff_name: staffName,
      inventoryData: {
        action: inventoryData.action,
        quantity: inventoryData.quantity,
        item: finalizedMaterial,
        cost: inventoryData.cost,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/operations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventoryPayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setNotification("Inventory successfully saved to VICI database!");

        // Re-fetch log list
        const updatedLogsResponse = await fetch(`${API_BASE_URL}/operations`);
        const updatedData = await updatedLogsResponse.json();
        if (updatedData.logs) setLogs(updatedData.logs);

        // Reset forms
        setInventoryData({
          item: "",
          action: "use",
          quantity: "",
          cost: "",
          date: getTodayDateString(),
        });
        setCustomMaterialName("");
        setIsCustomMaterial(false);
      } else {
        setNotification(data.message || "Server rejected transaction.");
      }
    } catch (err) {
      console.error(err);
      setNotification("Network Error: Could not reach the server.");
    } finally {
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleDeleteLog = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this record? This action will be flagged for Admin review.",
      )
    ) {
      setLogs(logs.filter((log) => log.id !== id));
      setNotification("Record deleted.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleEditLog = (id) => {
    alert(
      `Edit feature coming soon! You will be able to update record #${id}.`,
    );
  };

  const handleLogout = () => {
    navigate("/staff-login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-8">
      {/* HEADER SECTION */}
      <header className="bg-[#015c3a] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wider">VICI Staff</h1>
            <p className="text-xs text-green-200 opacity-95">
              Daily Operations
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-200 hover:text-white transition"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline font-semibold">Logout</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-6xl mx-auto p-4 mt-4">
        {notification && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
            <FaCheckCircle className="mr-2" />
            <span className="font-bold">{notification}</span>
          </div>
        )}

        <div className="md:grid md:grid-cols-2 md:gap-8 mb-8">
          {/* TAB 1: RECORD SALES */}
          <section
            className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 ${activeTab === "sales" ? "block" : "hidden md:block"}`}
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FaShoppingCart size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Record a Sale</h2>
            </div>

            <form onSubmit={handleSalesSubmit} className="space-y-5">
              {/* Date of Sale Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" /> Date of Sale
                  *
                </label>
                <input
                  type="date"
                  required
                  value={salesData.date}
                  onChange={(e) =>
                    setSalesData({ ...salesData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015c3a] bg-white font-medium"
                />
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Select Product *
                </label>
                <select
                  required
                  value={salesData.product}
                  onChange={handleProductChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015c3a] bg-white"
                >
                  <option value="" disabled>
                    -- Choose a product --
                  </option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} (Base: {p.price} RWF)
                    </option>
                  ))}
                </select>
              </div>

              {/* Side-by-side Quantity and Unit Price */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    required
                    value={salesData.quantity}
                    onChange={(e) =>
                      setSalesData({ ...salesData, quantity: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015c3a]"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Unit Price (RWF) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={salesData.unitPrice}
                    onChange={(e) =>
                      setSalesData({ ...salesData, unitPrice: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015c3a] bg-blue-50 font-semibold"
                  />
                </div>
              </div>

              {/* CRM Customer details */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
                <div className="flex items-center space-x-2 mb-4 text-[#015c3a]">
                  <FaUserCircle size={18} />
                  <h3 className="font-bold text-sm uppercase tracking-wide">
                    Customer Details (Optional)
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={customerData.name}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015c3a] text-sm"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={customerData.phone}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015c3a] text-sm"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={customerData.email}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015c3a] text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Delivery Address / Area"
                      value={customerData.address}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015c3a] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Running total display */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center">
                <span className="text-gray-500 font-bold">Total Price:</span>
                <span className="text-2xl font-extrabold text-[#015c3a]">
                  {calculatedTotal.toLocaleString()} RWF
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#015c3a] text-white font-bold py-3 rounded-lg shadow-md hover:bg-slate-900 transition"
              >
                Submit Sale
              </button>
            </form>
          </section>

          {/* TAB 2: UPDATE INVENTORY */}
          <section
            className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 ${activeTab === "inventory" ? "block" : "hidden md:block"}`}
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
                <FaBoxOpen size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Log Raw Materials
              </h2>
            </div>

            <form onSubmit={handleInventorySubmit} className="space-y-5">
              {/* Date of Activity Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" /> Date of Entry
                  *
                </label>
                <input
                  type="date"
                  required
                  value={inventoryData.date}
                  onChange={(e) =>
                    setInventoryData({ ...inventoryData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white font-medium"
                />
              </div>

              {/* Material Dropdown */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Select Material *
                </label>
                <select
                  required
                  value={
                    isCustomMaterial ? "add_new_custom" : inventoryData.item
                  }
                  onChange={handleMaterialSelectChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white font-medium text-gray-800"
                >
                  <option value="" disabled>
                    -- Choose material --
                  </option>
                  {rawMaterials.map((mat, i) => (
                    <option key={i} value={mat}>
                      {mat}
                    </option>
                  ))}
                  <option
                    value="add_new_custom"
                    className="text-[#015c3a] font-bold"
                  >
                    ➕ Add Custom Material Type...
                  </option>
                </select>
              </div>

              {/* Custom Material Input */}
              {isCustomMaterial && (
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 animate-fadeIn">
                  <label className="block text-xs font-bold text-orange-800 uppercase tracking-wider mb-2 flex items-center">
                    <FaPlusCircle className="mr-1 text-orange-500" /> New
                    Material Type Details
                  </label>
                  <input
                    type="text"
                    required={isCustomMaterial}
                    placeholder="Enter custom material name (e.g. Compost Box)"
                    value={customMaterialName}
                    onChange={(e) => setCustomMaterialName(e.target.value)}
                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 text-sm font-medium"
                  />
                  <p className="text-xs text-orange-600 mt-2">
                    This custom material will be temporarily memorized in your
                    dropdown list.
                  </p>
                </div>
              )}

              {/* Inventory Action */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Action *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      value="use"
                      checked={inventoryData.action === "use"}
                      onChange={(e) =>
                        setInventoryData({
                          ...inventoryData,
                          action: e.target.value,
                          cost: "",
                        })
                      }
                      className="text-[#015c3a] h-5 w-5 focus:ring-orange-500"
                    />
                    <span className="text-gray-700 font-medium">
                      Used in Production
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      value="add"
                      checked={inventoryData.action === "add"}
                      onChange={(e) =>
                        setInventoryData({
                          ...inventoryData,
                          action: e.target.value,
                        })
                      }
                      className="text-[#015c3a] h-5 w-5 focus:ring-orange-500"
                    />
                    <span className="text-gray-700 font-medium">
                      New Stock Arrived
                    </span>
                  </label>
                </div>
              </div>

              {/* Quantity and Total Cost */}
              <div className="flex space-x-4">
                <div
                  className={
                    inventoryData.action === "add" ? "w-1/2" : "w-full"
                  }
                >
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    required
                    value={inventoryData.quantity}
                    onChange={(e) =>
                      setInventoryData({
                        ...inventoryData,
                        quantity: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {inventoryData.action === "add" && (
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Total Cost (RWF) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={inventoryData.cost}
                      onChange={(e) =>
                        setInventoryData({
                          ...inventoryData,
                          cost: e.target.value,
                        })
                      }
                      placeholder="Amount paid"
                      className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-200 bg-orange-50 font-semibold"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`w-full text-white font-bold py-3 rounded-lg shadow-md transition ${inventoryData.action === "use" ? "bg-[#ff6d00] hover:bg-orange-700" : "bg-[#015c3a] hover:bg-emerald-800"}`}
              >
                {inventoryData.action === "use"
                  ? "Deduct from Stock"
                  : "Add to Stock"}
              </button>
            </form>
          </section>
        </div>

        {/* TAB 3: RECENT ACTIVITY */}
        <section
          className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 ${activeTab === "history" ? "block" : "hidden md:block"}`}
        >
          <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
              <FaHistory size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Recent Activity Logs
            </h2>
          </div>

          <div className="space-y-4">
            {logs.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No recent activity.
              </p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition gap-4"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${log.type === "Sale" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {log.type}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center bg-gray-100 px-2 py-1 rounded-full font-medium">
                        <FaCalendarAlt className="mr-1 text-gray-400" />{" "}
                        {log.date}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">
                        {log.time}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 mt-2 text-base">
                      {log.detail}
                    </p>

                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <FaUserCircle className="inline mr-1 text-gray-400" />{" "}
                      {log.customer}
                    </p>

                    <p
                      className={`font-bold text-sm mt-1 ${log.type === "Inventory" ? "text-orange-600" : "text-[#015c3a]"}`}
                    >
                      {log.amount}
                    </p>
                  </div>

                  <div className="flex space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleEditLog(log.id)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition bg-white border border-gray-200 rounded-md shadow-sm"
                      title="Edit entry"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition bg-white border border-gray-200 rounded-md shadow-sm"
                      title="Soft Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* BOTTOM MOBILE NAV BAR */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <button
          onClick={() => setActiveTab("sales")}
          className={`flex flex-col items-center p-2 rounded-lg transition ${activeTab === "sales" ? "text-[#015c3a]" : "text-gray-400"}`}
        >
          <FaShoppingCart size={24} className="mb-1" />
          <span className="text-xs font-bold">Sales</span>
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`flex flex-col items-center p-2 rounded-lg transition ${activeTab === "inventory" ? "text-[#015c3a]" : "text-gray-400"}`}
        >
          <FaBoxOpen size={24} className="mb-1" />
          <span className="text-xs font-bold">Inventory</span>
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center p-2 rounded-lg transition ${activeTab === "history" ? "text-[#015c3a]" : "text-gray-400"}`}
        >
          <FaHistory size={24} className="mb-1" />
          <span className="text-xs font-bold">History</span>
        </button>
      </nav>
    </div>
  );
}
