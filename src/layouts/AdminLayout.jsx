import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../pages/AdminDashboard";
import AdminServices from "../pages/AdminServices";
import ViewReports from "../pages/ViewReports";

function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-emerald-400 mb-10">
          Admin Panel
        </h1>

        <nav className="space-y-4">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-emerald-500 text-black"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-emerald-500 text-black"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Manage Services
          </NavLink>

          <NavLink
            to="/admin/issues"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-emerald-500 text-black"
                  : "hover:bg-slate-800"
              }`
            }
          >
            View Reports
          </NavLink>

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900">

          <div className="text-slate-400">
            Welcome, <span className="text-emerald-400 font-semibold">
              {user?.name}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

        {/* Page Content */}
        <div className="p-10 overflow-y-auto flex-1">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="issues" element={<ViewReports />} />
          </Routes>
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;
