import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Conferences", path: "/conferences" },
    { name: "Speakers", path: "/speakers" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "CRM", path: "/crm" },
    { name: "Analytics", path: "/analytics" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-72 min-h-screen bg-slate-900 border-r border-slate-800">

      <div className="p-6">
        <h1 className="text-cyan-400 text-3xl font-bold">
          Conference CRM
        </h1>
      </div>

      <div className="px-4 space-y-2">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block p-4 rounded-lg transition ${
                isActive
                  ? "bg-slate-700 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

      </div>
    </div>
  );
}