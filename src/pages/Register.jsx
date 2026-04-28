import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await register(formData);
      navigate(user.role === "admin" ? "/admin" : "/user");
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-emerald-950 via-black to-slate-950 overflow-hidden">
        <div className="absolute w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full top-20 left-20" />
        <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full bottom-20 right-20" />

        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Join Smart City
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Create an account to report issues and help your city respond faster.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-black px-6">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-[460px]">
          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-center text-slate-400 text-sm mb-8">
            Register to access the portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                name="role"
                className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <input
                name="city"
                type="text"
                placeholder="City"
                className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold transition hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
