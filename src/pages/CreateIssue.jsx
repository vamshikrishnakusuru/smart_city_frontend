import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useIssues } from "../context/IssueContext";
import MyIssues from "./MyIssues";

function CreateIssue() {
  const { user } = useAuth();
  const { addIssue } = useIssues();
  const [formData, setFormData] = useState({
    title: "",
    category: "WATER",
    city: user?.city || "",
    description: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      await addIssue(formData);
      setSuccess("Issue submitted successfully.");
      setFormData((prev) => ({
        ...prev,
        title: "",
        description: "",
      }));
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Report Issue</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-10"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            name="title"
            type="text"
            placeholder="Issue Title"
            className="p-3 rounded bg-slate-800 border border-slate-700"
            value={formData.title}
            onChange={handleChange}
          />

          <select
            name="category"
            className="p-3 rounded bg-slate-800 border border-slate-700"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="WATER">Water</option>
            <option value="ELECTRICITY">Electricity</option>
            <option value="GARBAGE">Garbage</option>
            <option value="ROADS">Roads</option>
          </select>

          <input
            name="city"
            type="text"
            placeholder="City"
            className="p-3 rounded bg-slate-800 border border-slate-700 md:col-span-2"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="description"
          placeholder="Describe the issue..."
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 mb-6 min-h-32"
          value={formData.description}
          onChange={handleChange}
        />

        {error ? (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 px-6 py-2 rounded hover:bg-cyan-600 transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>

      <MyIssues />
    </div>
  );
}

export default CreateIssue;
