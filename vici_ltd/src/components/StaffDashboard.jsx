import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Defining completely self-contained premium SVG icons to avoid external package resolution errors
const ShoppingCartIcon = ({ className = "w-5 h-5" }) => (
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
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const BoxOpenIcon = ({ className = "w-5 h-5" }) => (
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
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
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

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
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
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const HistoryIcon = ({ className = "w-5 h-5" }) => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TrashIcon = ({ className = "w-5 h-5" }) => (
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const EditIcon = ({ className = "w-5 h-5" }) => (
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
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const UserCircleIcon = ({ className = "w-5 h-5" }) => (
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
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const PlusCircleIcon = ({ className = "w-5 h-5" }) => (
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
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("sales");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function to get today's date in local YYYY-MM-DD format
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

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

  // Hybrid Material Lists State (Starts with presets, expands dynamically)
  const [rawMaterials, setRawMaterials] = useState([
    "Ipamba (kg)",
    "Umurama (kg)",
    "Sondori (kg)",
    "Ishwagara (kg)",
  ]);

  // States to handle dynamic custom material input visibility
  const [isCustomMaterial, setIsCustomMaterial] = useState(false);
  const [customMaterialName, setCustomMaterialName] = useState("");

  // Initial Seed Logs (With explicit dates)
  const [logs, setLogs] = useState([
    {
      id: 1,
      type: "Sale",
      detail: "5x Fresh Mushrooms @ 2,000 RWF",
      customer: "John Doe",
      amount: "10,000 RWF",
      date: "2026-06-18",
      time: "10:30 AM",
    },
    {
      id: 2,
      type: "Inventory",
      detail: "Added 10kg Ipamba",
      customer: "-",
      amount: "Cost: 15,000 RWF",
      date: "2026-06-18",
      time: "09:15 AM",
    },
    {
      id: 3,
      type: "Sale",
      detail: "2x Mushroom Tubes @ 700 RWF",
      customer: "Walk-in Customer",
      amount: "1,400 RWF",
      date: "2026-06-17",
      time: "08:45 AM",
    },
  ]);

  const products = [
    { id: "p1", name: "Fresh Mushrooms (kg)", price: 2000 },
    { id: "p2", name: "Mushroom Tubes", price: 700 },
  ];

  // ==========================================
  // DYNAMIC CALCULATIONS & HANDLERS
  // ==========================================

  // Auto-fills the unit price when a product is selected
  const handleProductChange = (e) => {
    const selectedName = e.target.value;
    const foundProduct = products.find((p) => p.name === selectedName);
    setSalesData({
      ...salesData,
      product: selectedName,
      unitPrice: foundProduct ? foundProduct.price : "",
    });
  };

  // Calculates total dynamically
  const calculatedTotal =
    salesData.quantity && salesData.unitPrice
      ? parseFloat(salesData.quantity) * parseFloat(salesData.unitPrice)
      : 0;

  // Handle dynamic dropdown changes for dynamic custom material selection
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

  // Submit recorded sales
  const handleSalesSubmit = (e) => {
    e.preventDefault();

    const customerName =
      customerData.name.trim() !== "" ? customerData.name : "Walk-in Customer";

    const newLog = {
      id: Date.now(),
      type: "Sale",
      detail: `${salesData.quantity}x ${salesData.product} @ ${Number(salesData.unitPrice).toLocaleString()} RWF`,
      customer: customerName,
      amount: `${calculatedTotal.toLocaleString()} RWF`,
      date: salesData.date,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setLogs([newLog, ...logs]);
    setNotification("Sale recorded successfully!");

    // Clear forms while retaining today's default date
    setSalesData({
      product: "",
      quantity: "",
      unitPrice: "",
      date: getTodayDateString(),
    });
    setCustomerData({ name: "", phone: "", email: "", address: "" });

    setTimeout(() => setNotification(""), 3000);
  };

  // Submit recorded inventory logs
  const handleInventorySubmit = (e) => {
    e.preventDefault();

    // Determine target material name based on hybrid choice
    const finalizedMaterial = isCustomMaterial
      ? customMaterialName.trim()
      : inventoryData.item;

    if (!finalizedMaterial) {
      alert("Please specify or select a valid material.");
      return;
    }

    // Dynamic addition to select dropdown options if it's a new custom type
    if (isCustomMaterial && !rawMaterials.includes(finalizedMaterial)) {
      setRawMaterials([...rawMaterials, finalizedMaterial]);
    }

    const newLog = {
      id: Date.now(),
      type: "Inventory",
      detail: `${inventoryData.action === "use" ? "Used" : "Added"} ${inventoryData.quantity} ${finalizedMaterial}`,
      customer: "-",
      amount:
        inventoryData.action === "add" && inventoryData.cost
          ? `Cost: ${Number(inventoryData.cost).toLocaleString()} RWF`
          : "-",
      date: inventoryData.date,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setLogs([newLog, ...logs]);
    setNotification("Inventory updated successfully!");

    // Reset inventory form
    setInventoryData({
      item: "",
      action: "use",
      quantity: "",
      cost: "",
      date: getTodayDateString(),
    });
    setCustomMaterialName("");
    setIsCustomMaterial(false);

    setTimeout(() => setNotification(""), 3000);
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
  const navigate = useNavigate();

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
            onClick={() => navigate("/staff-login", { replace: true })}
            className="flex items-center space-x-2 text-red-200 hover:text-white transition"
          >
            <SignOutIcon />
            <span className="hidden md:inline font-semibold">Logout</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-6xl mx-auto p-4 mt-4">
        {notification && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
            <CheckCircleIcon className="mr-2 w-5 h-5 text-green-600" />
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
                <ShoppingCartIcon size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Record a Sale</h2>
            </div>

            <form onSubmit={handleSalesSubmit} className="space-y-5">
              {/* Date of Sale Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center">
                  <CalendarIcon className="mr-2 text-gray-400 w-4 h-4" /> Date
                  of Sale *
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

              {/* CRM Customer details wrapper */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
                <div className="flex items-center space-x-2 mb-4 text-[#015c3a]">
                  <UserCircleIcon className="w-5 h-5 text-[#015c3a]" />
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

          {/* TAB 2: UPDATE INVENTORY (With Hybrid Custom Material Additions) */}
          <section
            className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 ${activeTab === "inventory" ? "block" : "hidden md:block"}`}
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
                <BoxOpenIcon size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Log Raw Materials
              </h2>
            </div>

            <form onSubmit={handleInventorySubmit} className="space-y-5">
              {/* Date of Activity Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center">
                  <CalendarIcon className="mr-2 text-gray-400 w-4 h-4" /> Date
                  of Entry *
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

              {/* Material Dropdown with Dynamic Custom Material Toggle */}
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

              {/* Conditionally rendered Custom Material Text input */}
              {isCustomMaterial && (
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 animate-fadeIn">
                  <label className="blocktext-xs font-bold text-orange-800 uppercase tracking-wider mb-2 flex items-center">
                    <PlusCircleIcon className="mr-1 text-orange-500 w-4 h-4" />{" "}
                    New Material Type Details
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
                    dropdown list for subsequent log entries.
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

              {/* Quantity / Financial input section */}
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
              <HistoryIcon size={20} />
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
                        <CalendarIcon className="mr-1 text-gray-400 w-3 h-3" />{" "}
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
                      <UserCircleIcon className="inline mr-1 text-gray-400 w-4 h-4" />{" "}
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
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition bg-white border border-gray-200 rounded-md shadow-sm"
                      title="Soft Delete"
                    >
                      <TrashIcon />
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
          <ShoppingCartIcon size={24} className="mb-1" />
          <span className="text-xs font-bold">Sales</span>
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`flex flex-col items-center p-2 rounded-lg transition ${activeTab === "inventory" ? "text-[#015c3a]" : "text-gray-400"}`}
        >
          <BoxOpenIcon size={24} className="mb-1" />
          <span className="text-xs font-bold">Inventory</span>
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center p-2 rounded-lg transition ${activeTab === "history" ? "text-[#015c3a]" : "text-gray-400"}`}
        >
          <HistoryIcon size={24} className="mb-1" />
          <span className="text-xs font-bold">History</span>
        </button>
      </nav>
    </div>
  );
}