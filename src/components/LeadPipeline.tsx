type Lead = {
  id: number;
  name: string;
  company: string;
  email: string;
  stage: string;
  value: string;
};

type Props = {
  leads: Lead[];
  onDeleteLead: (id: number) => void;
  onEditLead: (lead: Lead) => void;
};

export default function LeadPipeline({
  leads,
  onDeleteLead,
  onEditLead,
}: Props) {
  
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
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t border-slate-700"
            >
              <td className="p-4">{lead.name}</td>
              <td className="p-4">{lead.company}</td>
              <td className="p-4">{lead.email}</td>
              <td className="p-4">{lead.stage}</td>
              <td className="p-4">{lead.value}</td>

              <td className="p-4">
                <button
  onClick={() =>
    onEditLead(lead)
  }
  className="bg-cyan-500 px-3 py-1 rounded mr-2"
>
  Edit
</button>

                <button
                  onClick={() =>
                    onDeleteLead(lead.id)
                  }
                  className="bg-red-500 px-3 py-1 rounded"
                >
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