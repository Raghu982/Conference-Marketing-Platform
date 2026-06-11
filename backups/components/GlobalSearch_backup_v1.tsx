import { useState } from "react";

export default function GlobalSearch() {
  const [search, setSearch] = useState("");

  const data = [
    "FinTech Summit 2026",
    "Healthcare Expo",
    "Rajesh Kumar",
    "Sarah Johnson",
    "Microsoft",
    "Google",
    "AWS",
    "CRM Lead",
  ];

  const results = data.filter((item) =>
    item.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (
    <div className="bg-slate-800 rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        Global Search
      </h2>

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search conferences, speakers, sponsors..."
        className="w-full p-4 rounded bg-slate-700 mb-4"
      />

      <div className="space-y-2">
        {results.map((item, index) => (
          <div
            key={index}
            className="bg-slate-700 p-3 rounded"
          >
            {item}
          </div>
        ))}
      </div>

    </div>
  );
}