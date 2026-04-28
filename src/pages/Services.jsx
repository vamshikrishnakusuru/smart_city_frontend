import { useState, useEffect } from "react";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("services");
    if (stored) {
      setServices(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Public Services</h1>

      {services.length === 0 ? (
        <p className="text-slate-400">No services available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900 p-6 rounded-xl border border-slate-800"
            >
              <h2 className="text-xl font-semibold text-cyan-400">
                {service.name}
              </h2>

              <p
                className={`mt-2 ${
                  service.status === "Active"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                Status: {service.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;