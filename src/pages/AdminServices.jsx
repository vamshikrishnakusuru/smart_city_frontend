import { useState, useEffect } from "react";

function AdminServices() {
  const [services, setServices] = useState(() => {
    const stored = localStorage.getItem("services");
    return stored ? JSON.parse(stored) : [];
  });

  const [newService, setNewService] = useState("");

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  const addService = () => {
    if (!newService.trim()) return;

    const service = {
      id: Date.now(),
      name: newService,
      status: "Active",
    };

    setServices([...services, service]);
    setNewService("");
  };

  const toggleStatus = (id) => {
    setServices(
      services.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );
  };

  const deleteService = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-500"
      : "bg-red-500";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Services</h1>

      {/* Analytics Card */}
      <div className="mb-8 bg-slate-900 p-6 rounded-xl border border-slate-800">
        <p className="text-slate-400">Total Services</p>
        <h2 className="text-3xl font-bold text-emerald-400">
          {services.length}
        </h2>
      </div>

      {/* Add Service */}
      <div className="flex gap-4 mb-8">
        <input
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          placeholder="Enter service name"
          className="p-2 rounded bg-slate-900 border border-slate-700 w-72"
        />
        <button
          onClick={addService}
          className="bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-600 transition"
        >
          Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-slate-400 text-sm">
            <tr>
              <th className="p-4">Service Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-slate-400">
                  No services added yet.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="border-t border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="p-4 font-semibold text-emerald-400">
                    {service.name}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${getStatusColor(
                        service.status
                      )}`}
                    >
                      {service.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => toggleStatus(service.id)}
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => deleteService(service.id)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminServices;