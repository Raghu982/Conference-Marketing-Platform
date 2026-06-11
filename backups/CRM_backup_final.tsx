import LeadStats from "../components/LeadStats";
import LeadPipeline from "../components/LeadPipeline";

export default function CRM() {
  return (
    <div className="p-6 text-white bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold mb-6">
        CRM Lead Management
      </h1>

      <LeadStats
        total={125}
        qualified={48}
        proposal={21}
        won={14}
      />

      <div className="bg-slate-800 p-6 rounded-xl mb-6">

        <h2 className="text-2xl font-bold mb-4">
          Add New Lead
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Lead Name"
            className="p-4 rounded bg-slate-700"
          />

          <input
            placeholder="Company"
            className="p-4 rounded bg-slate-700"
          />

          <input
            placeholder="Email"
            className="p-4 rounded bg-slate-700"
          />

          <select
            className="p-4 rounded bg-slate-700"
          >
            <option>Qualified</option>
            <option>Proposal</option>
            <option>Won</option>
          </select>

        </div>

        <button className="mt-4 bg-cyan-500 px-6 py-3 rounded font-bold">
          Add Lead
        </button>

      </div>

      <LeadPipeline />

    </div>
  );
}