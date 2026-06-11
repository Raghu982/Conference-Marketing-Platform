type Props = {
  total: number;
  platinum: number;
  gold: number;
};

export default function SponsorStats({
  total,
  platinum,
  gold,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="text-gray-400">Total Sponsors</p>
        <h2 className="text-4xl font-bold text-white">{total}</h2>
      </div>

      <div className="bg-green-900/30 p-6 rounded-xl">
        <p className="text-green-400">Platinum</p>
        <h2 className="text-4xl font-bold text-white">{platinum}</h2>
      </div>

      <div className="bg-yellow-900/30 p-6 rounded-xl">
        <p className="text-yellow-400">Gold</p>
        <h2 className="text-4xl font-bold text-white">{gold}</h2>
      </div>
    </div>
  );
}