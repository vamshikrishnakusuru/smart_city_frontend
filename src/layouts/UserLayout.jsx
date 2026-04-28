import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserDashboard from "../pages/UserDashboard";
import Services from "../pages/Services";
import CreateIssue from "../pages/CreateIssue";
import Feedback from "../pages/Feedback";
import MyIssues from "../pages/MyIssues";

function UserLayout() {
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
        <h1 className="text-2xl font-bold text-cyan-400 mb-10">
          Smart City
        </h1>

        <nav className="space-y-4">

          <NavLink
            to="/user"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-cyan-500 text-black"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/user/services"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-cyan-500 text-black"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Public Services
          </NavLink>

          <NavLink
            to="/user/report"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-cyan-500 text-black"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Report Issue
          </NavLink>

          <NavLink
            to="/user/issues"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-cyan-500 text-black"
                  : "hover:bg-slate-800"
              }`
            }
          >
            My Issues
          </NavLink>

          <NavLink
            to="/user/feedback"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-cyan-500 text-black"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Feedback
          </NavLink>

        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900">

          <div className="text-slate-400">
            Welcome, <span className="text-cyan-400 font-semibold">
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
            <Route path="/" element={<UserDashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="report" element={<CreateIssue />} />
            <Route path="issues" element={<MyIssues />} />
            <Route path="feedback" element={<Feedback />} />
          </Routes>
        </div>

      </div>

    </div>
  );
}

export default UserLayout;
