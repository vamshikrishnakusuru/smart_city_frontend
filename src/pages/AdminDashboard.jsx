import { useIssues } from "../context/IssueContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AdminDashboard() {
  const { issues, loading, error } = useIssues();

  const pending = issues.filter((issue) => issue.status === "PENDING").length;
  const progress = issues.filter((issue) => issue.status === "IN_PROGRESS").length;
  const resolved = issues.filter((issue) => issue.status === "RESOLVED").length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: progress },
    { name: "Resolved", value: resolved },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:scale-105 transition">
          <p className="text-slate-400">Total Issues</p>
          <h2 className="text-3xl font-bold text-white">
            {issues.length}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:scale-105 transition">
          <p className="text-slate-400">Pending Issues</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            {pending}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:scale-105 transition">
          <p className="text-slate-400">Resolved Issues</p>
          <h2 className="text-3xl font-bold text-green-400">
            {resolved}
          </h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {loading ? <p className="text-slate-400 md:col-span-2">Loading admin analytics...</p> : null}
        {error ? <p className="text-red-300 md:col-span-2">{error}</p> : null}

        {/* Bar Chart */}
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <h2 className="text-xl font-semibold mb-6 text-emerald-400">
            Issue Status (Bar Chart)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <h2 className="text-xl font-semibold mb-6 text-emerald-400">
            Issue Distribution (Pie Chart)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
