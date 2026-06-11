type Props = {
  total: number;
  qualified: number;
  proposal: number;
  won: number;
};

export default function LeadStats({
  total,
  qualified,
  proposal,
  won,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">

      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="text-gray-400">Total Leads</p>
        <h2 className="text-4xl font-bold text-white">
          {total}
        </h2>
      </div>

      <div className="bg-blue-900/30 p-6 rounded-xl">
        <p className="text-blue-400">Qualified</p>
        <h2 className="text-4xl font-bold text-white">
          {qualified}
        </h2>
      </div>

      <div className="bg-yellow-900/30 p-6 rounded-xl">
        <p className="text-yellow-400">Proposal Sent</p>
        <h2 className="text-4xl font-bold text-white">
          {proposal}
        </h2>
      </div>

      <div className="bg-green-900/30 p-6 rounded-xl">
        <p className="text-green-400">Won</p>
        <h2 className="text-4xl font-bold text-white">
          {won}
        </h2>
      </div>

    </div>
  );
}