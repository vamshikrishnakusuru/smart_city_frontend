import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login({ email, password });
      navigate(user.role === "admin" ? "/admin" : "/user");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* LEFT SIDE - Branding */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-950 overflow-hidden">

        <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full top-20 left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full bottom-20 right-20 animate-pulse"></div>

        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Smart City Portal
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            A unified digital platform to manage infrastructure,
            public services, and city operations efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Login */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-black">

        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl w-[420px]">

          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-slate-400 text-sm mb-8">
            Login to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-6">

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error ? (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-semibold transition hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Need an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
