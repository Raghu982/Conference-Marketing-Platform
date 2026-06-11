import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Qualified", value: 45 },
  { name: "Proposal", value: 25 },
  { name: "Won", value: 15 },
  { name: "Lost", value: 15 },
];

const COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#ef4444",
];

export default function LeadConversionChart() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h2 className="text-xl font-bold text-white mb-4">
        Lead Conversion
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}