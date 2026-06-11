type Props = {
  title: string;
  value: string;
};

export default function AnalyticsCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-5 rounded-xl">
      <h3 className="text-sm text-white/80">
        {title}
      </h3>

      <div className="text-3xl font-bold text-white mt-2">
        {value}
      </div>
    </div>
  );
}