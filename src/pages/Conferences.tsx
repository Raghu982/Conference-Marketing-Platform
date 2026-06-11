import { useEffect, useState } from "react";
import ConferenceForm from "../components/ConferenceForm";
import { conferenceService } from "../services/conferenceService";
import { notificationService } from "../services/notificationService";

export default function Conferences() {
  const [conferences, setConferences] =
    useState<any[]>([]);

  const [editingConference, setEditingConference] =
    useState<any>(null);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      const data =
        await conferenceService.getAll();

      setConferences(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateConference = async (
    name: string,
    city: string
  ) => {
    try {
      if (editingConference) {
        await conferenceService.update(
          editingConference.id,
          {
            name,
            location: city,
            date: editingConference.date,
            attendees:
              editingConference.attendees,
          }
        );

        setEditingConference(null);
      } else {
        await conferenceService.create({
  name,
  location: city,
  date: "2026-12-31",
  attendees: 0,
});

notificationService.add(
  `Conference Added: ${name}`
);
      }

      fetchConferences();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteConference =
  async (id: number) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this conference?"
      );

    if (!confirmed) return;

    try {
      await conferenceService.delete(id);

      fetchConferences();
    } catch (error) {
      console.error(error);
    }
  };

  const editConference = (
    conference: any
  ) => {
    setEditingConference(conference);
  };

  return (
    <div className="p-6 text-white bg-slate-950 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        Conferences
      </h1>

      <ConferenceForm
        onAddConference={
          updateConference
        }
        editingConference={
          editingConference
        }
      />

      <div className="bg-slate-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-700">
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Location
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Attendees
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {conferences.map(
              (conf) => (
                <tr
                  key={conf.id}
                  className="border-t border-slate-700"
                >
                  <td className="p-4">
                    {conf.name}
                  </td>

                  <td className="p-4">
                    {conf.location}
                  </td>

                  <td className="p-4">
                    {conf.date}
                  </td>

                  <td className="p-4">
                    {conf.attendees}
                  </td>

                  <td className="p-4 space-x-2">
                    <button
                      onClick={() =>
                        editConference(
                          conf
                        )
                      }
                      className="bg-cyan-600 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteConference(
                          conf.id
                        )
                      }
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}