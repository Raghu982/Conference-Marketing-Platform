import { useEffect, useState } from "react";
import LeadStats from "../components/LeadStats";
import LeadPipeline from "../components/LeadPipeline";
import { leadService } from "../services/leadService";
import Toast from "../components/Toast";
import { notificationService } from "../services/notificationService";

export default function CRM() {
  const [leads, setLeads] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [stage, setStage] =
    useState("Qualified");

  const [search, setSearch] =
    useState("");

  const [editingLead, setEditingLead] =
    useState<any>(null);

  const [toast, setToast] =
    useState("");

  const showToast = (
    message: string
  ) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const fetchLeads = async () => {
    try {
      const data =
        await leadService.getAll();

      setLeads(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async () => {
    if (!name || !company || !email)
      return;

    try {
      if (editingLead) {
        await leadService.update(
          editingLead.id,
          {
            name,
            company,
            email,
            stage,
            value:
              editingLead.value ||
              "100000",
          }
        );

        showToast(
          "✅ Lead Updated"
        );

        setEditingLead(null);
      } else {
        await leadService.create({
  name,
  company,
  email,
  stage,
  value: "100000",
});

notificationService.add(
  `Lead Added: ${name}`
);

showToast(
  "✅ Lead Added"
);
      }

      setName("");
      setCompany("");
      setEmail("");
      setStage("Qualified");

      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLead = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this lead?"
      );

    if (!confirmed) return;

    try {
      await leadService.delete(id);

      showToast(
        "✅ Lead Deleted"
      );

      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const editLead = (
    lead: any
  ) => {
    setEditingLead(lead);

    setName(lead.name);
    setCompany(lead.company);
    setEmail(lead.email);
    setStage(lead.stage);
  };

  const filteredLeads =
    leads.filter(
      (lead) =>
        lead.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        lead.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <>
      {toast && (
        <Toast
          message={toast}
        />
      )}

      <div className="p-6 text-white bg-slate-950 min-h-screen">
        <h1 className="text-4xl font-bold mb-6">
          CRM Lead Management
        </h1>

        <LeadStats
          total={leads.length}
          qualified={
            leads.filter(
              (l) =>
                l.stage ===
                "Qualified"
            ).length
          }
          proposal={
            leads.filter(
              (l) =>
                l.stage ===
                "Proposal"
            ).length
          }
          won={
            leads.filter(
              (l) =>
                l.stage === "Won"
            ).length
          }
        />

        <div className="bg-slate-800 p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingLead
              ? "Update Lead"
              : "Add New Lead"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Lead Name"
              className="p-4 rounded bg-slate-700"
            />

            <input
              value={company}
              onChange={(e) =>
                setCompany(
                  e.target.value
                )
              }
              placeholder="Company"
              className="p-4 rounded bg-slate-700"
            />

            <input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Email"
              className="p-4 rounded bg-slate-700"
            />

            <select
              value={stage}
              onChange={(e) =>
                setStage(
                  e.target.value
                )
              }
              className="p-4 rounded bg-slate-700"
            >
              <option>
                Qualified
              </option>

              <option>
                Proposal
              </option>

              <option>
                Won
              </option>
            </select>
          </div>

          <button
            onClick={addLead}
            className="mt-4 bg-cyan-500 px-6 py-3 rounded font-bold"
          >
            {editingLead
              ? "Update Lead"
              : "Add Lead"}
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search Lead..."
          className="w-full p-4 rounded bg-slate-700 mb-6"
        />

        <LeadPipeline
          leads={filteredLeads}
          onDeleteLead={
            deleteLead
          }
          onEditLead={
            editLead
          }
        />
      </div>
    </>
  );
}