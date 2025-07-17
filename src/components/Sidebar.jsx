import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dashboard,
  People,
  School,
  Menu,
  Close,
  ExitToApp,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeMenuItem, setActiveMenuItem }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Dashboard, path: "/dashboard" },
    { id: "students", label: "Students", icon: People, path: "/dashboard/student" },
  ];

  if (user?.role === "admin") {
    menuItems.push({
      id: "staff",
      label: "Staff",
      icon: School,
      path: "/dashboard/staff",
    });
  }

  const handleMenuItemClick = (itemId, path) => {
    setActiveMenuItem(itemId);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const MenuItem = ({ item, isActive }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={() => handleMenuItemClick(item.id, item.path)}
        className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ${
          isActive
            ? "bg-indigo-50 text-indigo-600 border-r-3 border-indigo-600"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className={`font-medium ${!sidebarOpen ? "hidden" : ""}`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <School className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <span className="ml-3 text-xl font-bold text-gray-800">EduAdmin</span>
          )}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <Close className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isActive={activeMenuItem === item.id}
          />
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-gray-100 hover:text-red-700 transition-all duration-200"
        >
          <ExitToApp className="w-5 h-5 mr-3" />
          <span className={`font-medium ${!sidebarOpen ? "hidden" : ""}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;