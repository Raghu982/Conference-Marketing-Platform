import SettingsCard from "../components/SettingsCard";

export default function Settings() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Settings
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <SettingsCard
          title="Company"
          value="Conference CRM"
        />

        <SettingsCard
          title="Admin User"
          value="Admin"
        />

        <SettingsCard
          title="Plan"
          value="Professional"
        />
      </div>

      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Notification Settings
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            Email Notifications
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            Registration Alerts
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Marketing Updates
          </label>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Security
        </h2>

        <button className="bg-cyan-500 px-5 py-2 rounded-lg font-semibold">
          Change Password
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          API Keys
        </h2>

        <div className="bg-slate-700 p-4 rounded-lg">
          sk_live_conferencecrm_xxxxxxxxx
        </div>
      </div>
    </div>
  );
}