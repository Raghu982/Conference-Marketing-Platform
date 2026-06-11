import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    sponsor: "Microsoft",
    revenue: 25,
  },
  {
    sponsor: "Google",
    revenue: 20,
  },
  {
    sponsor: "AWS",
    revenue: 10,
  },
];

export default function SponsorRevenueChart() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h2 className="text-xl font-bold text-white mb-4">
        Sponsor Revenue
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="sponsor" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#06b6d4"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}