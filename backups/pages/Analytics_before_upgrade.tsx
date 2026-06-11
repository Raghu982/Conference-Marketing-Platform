import LeadConversionChart from "../components/LeadConversionChart";
import SponsorRevenueChart from "../components/SponsorRevenueChart";
import RevenueChart from "../components/RevenueChart";
import RegistrationChart from "../components/RegistrationChart";

export default function Analytics() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-slate-400">Revenue</p>
          <h2 className="text-4xl font-bold">₹18.4L</h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-slate-400">Registrations</p>
          <h2 className="text-4xl font-bold">2438</h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-slate-400">Open Rate</p>
          <h2 className="text-4xl font-bold">42%</h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-slate-400">Conversion</p>
          <h2 className="text-4xl font-bold">18%</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
  <RevenueChart />
  <RegistrationChart />
  <LeadConversionChart />
  <SponsorRevenueChart />
</div>
    </div>
  );
}