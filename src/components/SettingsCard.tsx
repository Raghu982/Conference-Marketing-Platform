type Props = {
  title: string;
  value: string;
};

export default function SettingsCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <p className="text-slate-400 mb-2">
        {title}
      </p>

      <h3 className="text-xl font-semibold text-white">
        {value}
      </h3>
    </div>
  );
}