export default function LeadPipeline() {
  const leads = [
    {
      name: "Rajesh Kumar",
      company: "Microsoft",
      email: "rajesh@microsoft.com",
      stage: "Qualified",
      value: "₹5L",
    },
    {
      name: "Sarah Johnson",
      company: "Google",
      email: "sarah@google.com",
      stage: "Proposal",
      value: "₹8L",
    },
    {
      name: "David Lee",
      company: "AWS",
      email: "david@aws.com",
      stage: "Won",
      value: "₹12L",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden">

      <table className="w-full">
        <thead className="bg-slate-700">
          <tr>
            <th className="p-4 text-left">Lead</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Stage</th>
            <th className="p-4 text-left">Value</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead, index) => (
            <tr
              key={index}
              className="border-t border-slate-700"
            >
              <td className="p-4">{lead.name}</td>
              <td className="p-4">{lead.company}</td>
              <td className="p-4">{lead.email}</td>

              <td className="p-4">
                {lead.stage}
              </td>

              <td className="p-4">
                {lead.value}
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
  );
}