type Props = {
  total: number;
  confirmed: number;
  pending: number;
};

export default function SpeakerStats({
  total,
  confirmed,
  pending,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="text-gray-400">Total Speakers</p>
        <h2 className="text-4xl font-bold text-white">{total}</h2>
      </div>

      <div className="bg-green-900/40 p-6 rounded-xl">
        <p className="text-green-300">Confirmed</p>
        <h2 className="text-4xl font-bold text-white">{confirmed}</h2>
      </div>

      <div className="bg-yellow-900/40 p-6 rounded-xl">
        <p className="text-yellow-300">Pending</p>
        <h2 className="text-4xl font-bold text-white">{pending}</h2>
      </div>
    </div>
  );
}