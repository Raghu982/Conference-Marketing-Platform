import { useEffect, useState } from "react";
import { sponsorService } from "../services/sponsorService";
import SponsorStats from "../components/SponsorStats";
import { notificationService } from "../services/notificationService";

export default function Sponsors() {
const [search, setSearch] = useState("");
const [name, setName] = useState("");
const [tier, setTier] = useState("");
const [amount, setAmount] = useState("");
const [editingSponsor, setEditingSponsor] =
  useState<any>(null);

const [sponsors, setSponsors] =
  useState<any[]>([]);

const fetchSponsors = async () => {
  try {
    const data =
      await sponsorService.getAll();

    setSponsors(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchSponsors();
}, []);

const addSponsor = async () => {
  if (!name || !tier || !amount)
    return;

  try {
    if (editingSponsor) {
      await sponsorService.update(
  editingSponsor.id,
  {
    name,
    tier,
    amount,
    status:
      editingSponsor.status,
  }
);

      setEditingSponsor(null);
    } else {
  await sponsorService.create({
  name,
  tier,
  amount,
  status: "Pending",
});

notificationService.add(
  `Sponsor Added: ${name}`
);
}

setName("");
setTier("");
setAmount("");

fetchSponsors();
} catch (error) {
    console.error(error);
  }
};

const deleteSponsor = async (
  id: number
) => {
  const confirmed =
    window.confirm(
      "Are you sure you want to delete this sponsor?"
    );

  if (!confirmed) return;

  try {
    await sponsorService.delete(id);

    fetchSponsors();
  } catch (error) {
    console.error(error);
  }
};

const editSponsor = (
  sponsor: any
) => {
  setEditingSponsor(sponsor);

  setName(sponsor.name);
  setTier(sponsor.tier);
  setAmount(sponsor.amount);
};

 const filteredSponsors = sponsors.filter((sponsor) =>
  sponsor.name.toLowerCase().includes(search.toLowerCase())
);

const totalSponsors = sponsors.length;

const platinumSponsors = sponsors.filter(
  (sponsor) => sponsor.tier === "Platinum"
).length;

const goldSponsors = sponsors.filter(
  (sponsor) => sponsor.tier === "Gold"
).length;

return (

    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">Sponsors</h1>

      <SponsorStats
  total={totalSponsors}
  platinum={platinumSponsors}
  gold={goldSponsors}
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
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
  placeholder="Sponsor Name"
  className="w-full p-4 rounded bg-slate-700"
/>

          <input
  value={tier}
  onChange={(e) =>
    setTier(e.target.value)
  }
  placeholder="Tier"
  className="w-full p-4 rounded bg-slate-700"
/>

  <input
  type="number"
  min="0"
  value={amount}
  onChange={(e) =>
    setAmount(e.target.value)
  }
  placeholder="Contribution Amount"
  className="w-full p-4 rounded bg-slate-700"
/>

          <button
  onClick={addSponsor}
  className="bg-cyan-500 px-6 py-3 rounded font-semibold"
>
  {editingSponsor
  ? "Update Sponsor"
  : "Add Sponsor"}
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
            {filteredSponsors.map((sponsor) => (
              <tr
                key={sponsor.id}
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
                  <button
  onClick={() =>
    editSponsor(sponsor)
  }
  className="bg-cyan-500 px-4 py-2 rounded mr-2"
>
  Edit
</button>

                  <button
  onClick={() =>
  deleteSponsor(sponsor.id)
}
  className="bg-red-500 px-4 py-2 rounded"
>
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
