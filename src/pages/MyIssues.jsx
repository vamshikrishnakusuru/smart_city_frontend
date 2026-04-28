import { useEffect } from "react";
import { useIssues } from "../context/IssueContext";

function formatStatus(status) {
  return status?.replaceAll("_", " ") || "UNKNOWN";
}

function getStatusColor(status) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500";
    case "IN_PROGRESS":
      return "bg-blue-500";
    case "RESOLVED":
      return "bg-green-500";
    default:
      return "bg-slate-500";
  }
}

function MyIssues() {
  const { issues, loading, error, refreshIssues } = useIssues();

  useEffect(() => {
    refreshIssues();
  }, [refreshIssues]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Your Previous Reports ({issues.length})
        </h2>

        <button
          onClick={refreshIssues}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700 transition"
        >
          Refresh
        </button>
      </div>

      {loading ? <p className="text-slate-400">Loading issues...</p> : null}
      {error ? <p className="text-red-300">{error}</p> : null}

      {!loading && !error && issues.length === 0 ? (
        <p className="text-slate-400">You have not submitted any issues yet.</p>
      ) : null}

      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-slate-900 p-6 rounded-xl border border-slate-800"
          >
            <div className="flex justify-between items-center mb-3 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400">
                  {issue.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {issue.category} • {issue.city}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded text-white text-sm ${getStatusColor(
                  issue.status
                )}`}
              >
                {formatStatus(issue.status)}
              </span>
            </div>

            <p className="text-slate-300 text-sm">{issue.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyIssues;
