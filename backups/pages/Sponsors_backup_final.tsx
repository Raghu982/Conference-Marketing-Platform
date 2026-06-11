import { useState } from "react";
import SponsorStats from "../components/SponsorStats";

export default function Sponsors() {
  const [search, setSearch] = useState("");

  const sponsors = [
    {
      name: "Microsoft",
      tier: "Platinum",
      amount: "₹25L",
      status: "Active",
    },
    {
      name: "Google",
      tier: "Platinum",
      amount: "₹20L",
      status: "Active",
    },
    {
      name: "AWS",
      tier: "Gold",
      amount: "₹10L",
      status: "Pending",
    },
  ];

  const filteredSponsors = sponsors.filter((sponsor) =>
    sponsor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">Sponsors</h1>

      <SponsorStats
        total={3}
        platinum={2}
        gold={1}
      />

      <input
        type="text"
        placeholder="Search Sponsor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded bg-slate-700 mb-6"
      />

      <div className="bg-slate-800 p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Add Sponsor
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Sponsor Name"
            className="w-full p-4 rounded bg-slate-700"
          />

          <input
            placeholder="Tier"
            className="w-full p-4 rounded bg-slate-700"
          />

          <input
            placeholder="Contribution Amount"
            className="w-full p-4 rounded bg-slate-700"
          />

          <button className="bg-cyan-500 px-6 py-3 rounded font-semibold">
            Add Sponsor
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Tier</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSponsors.map((sponsor, index) => (
              <tr
                key={index}
                className="border-t border-slate-700"
              >
                <td className="p-4">{sponsor.name}</td>
                <td className="p-4">{sponsor.tier}</td>
                <td className="p-4">{sponsor.amount}</td>

                <td className="p-4">
                  <span
                    className={`px-4 py-2 rounded-full ${
                      sponsor.status === "Active"
                        ? "bg-green-900 text-green-400"
                        : "bg-yellow-900 text-yellow-400"
                    }`}
                  >
                    {sponsor.status}
                  </span>
                </td>

                <td className="p-4">
                  <button className="bg-cyan-500 px-4 py-2 rounded mr-2">
                    Edit
                  </button>

                  <button className="bg-red-500 px-4 py-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}