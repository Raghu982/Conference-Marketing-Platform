import ConferenceForm from "../components/ConferenceForm";

export default function Conferences() {
  const conferences = [
    {
      id: 1,
      name: "FinTech Summit 2026",
      city: "Mumbai",
      date: "12 Jul 2026",
      status: "Open",
      registrations: 820,
    },
    {
      id: 2,
      name: "Healthcare Expo",
      city: "Bangalore",
      date: "28 Aug 2026",
      status: "Open",
      registrations: 640,
    },
    {
      id: 3,
      name: "AI Leadership Forum",
      city: "Hyderabad",
      date: "10 Sep 2026",
      status: "Draft",
      registrations: 978,
    },
  ];

  return (
    <div className="p-6 text-white bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold mb-6">
        Conferences
      </h1>

      <ConferenceForm />

      <div className="bg-slate-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-700">
              <th className="p-4 text-left">
                Name
              </th>
              <th className="p-4 text-left">
                City
              </th>
              <th className="p-4 text-left">
                Date
              </th>
              <th className="p-4 text-left">
                Status
              </th>
              <th className="p-4 text-left">
                Registrations
              </th>
              <th className="p-4 text-left">
  Actions
</th>
            </tr>
          </thead>

          <tbody>
            {conferences.map((conf) => (
              <tr
                key={conf.id}
                className="border-t border-slate-700"
              >
                <td className="p-4">
                  {conf.name}
                </td>

                <td className="p-4">
                  {conf.city}
                </td>

                <td className="p-4">
                  {conf.date}
                </td>

                <td className="p-4">
  <span
    className={
      conf.status === "Open"
        ? "bg-green-500/20 text-green-400 px-3 py-1 rounded-full"
        : "bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full"
    }
  >
    {conf.status}
  </span>
</td>

                <td className="p-4">
                  {conf.registrations}
                </td>
                <td className="p-4">
  <div className="flex gap-2">

    <button
      className="bg-cyan-600 px-3 py-1 rounded"
    >
      Edit
    </button>

    <button
      className="bg-red-600 px-3 py-1 rounded"
    >
      Delete
    </button>

  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}