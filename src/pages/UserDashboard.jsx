import { useIssues } from "../context/IssueContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function UserDashboard() {
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
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p className="text-slate-400">Your Total Issues</p>
          <h2 className="text-3xl font-bold text-white">
            {issues.length}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p className="text-slate-400">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            {pending}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p className="text-slate-400">Resolved</p>
          <h2 className="text-3xl font-bold text-green-400">
            {resolved}
          </h2>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
        <h2 className="text-xl font-semibold mb-6 text-cyan-400">
          Your Issue Status Overview
        </h2>

        {loading ? <p className="text-slate-400 mb-4">Loading dashboard data...</p> : null}
        {error ? <p className="text-red-300 mb-4">{error}</p> : null}

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
  );
}

export default UserDashboard;
