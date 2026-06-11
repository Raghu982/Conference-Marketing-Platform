import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", registrations: 120 },
  { month: "Feb", registrations: 180 },
  { month: "Mar", registrations: 240 },
  { month: "Apr", registrations: 320 },
  { month: "May", registrations: 420 },
  { month: "Jun", registrations: 580 },
];

export default function RegistrationChart() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h2 className="text-xl font-bold text-white mb-4">
        Registrations Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#334155" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="registrations"
              fill="#06b6d4"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}