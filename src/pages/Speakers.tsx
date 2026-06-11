import { useEffect, useState } from "react";
import { speakerService } from "../services/speakerService";

import SpeakerStats from "../components/SpeakerStats";
import { notificationService } from "../services/notificationService";

export default function Speakers() {
  const [speakers, setSpeakers] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [topic, setTopic] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [editingSpeaker, setEditingSpeaker] =
    useState<any>(null);

  
  const fetchSpeakers = async () => {
  try {
    const data =
      await speakerService.getAll();

    setSpeakers(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchSpeakers();
}, []);

const addSpeaker = async () => {
  if (!name || !company || !topic)
    return;

  try {
    if (editingSpeaker) {
      await speakerService.update(
  editingSpeaker.id,
  {
    name,
    company,
    topic,
    status:
      editingSpeaker.status,
  }
);

      setEditingSpeaker(null);
    } else {
      await speakerService.create({
  name,
  company,
  topic,
  status: "Pending",
});

notificationService.add(
  `Speaker Added: ${name}`
);
    }

    setName("");
    setCompany("");
    setTopic("");

    fetchSpeakers();
  } catch (error) {
    console.error(error);
  }
};

const deleteSpeaker = async (
  id: number
) => {
  const confirmed =
    window.confirm(
      "Are you sure you want to delete this speaker?"
    );

  if (!confirmed) return;

  try {
    await speakerService.delete(id);

    fetchSpeakers();
  } catch (error) {
    console.error(error);
  }
};

const editSpeaker = (
  speaker: any
) => {
  setEditingSpeaker(speaker);

  setName(speaker.name);
  setCompany(speaker.company);
  setTopic(speaker.topic);
};

const filteredSpeakers = speakers.filter(
  (speaker) =>
    speaker.name
      .toLowerCase()
      .includes(search.toLowerCase())
);

const totalSpeakers = speakers.length;

const confirmedSpeakers = speakers.filter(
  (speaker) => speaker.status === "Confirmed"
).length;

const pendingSpeakers = speakers.filter(
  (speaker) => speaker.status === "Pending"
).length;
  return (
    <div className="p-8 text-white">
      <h1 className="text-5xl font-bold mb-8">Speakers</h1>
      <SpeakerStats
  total={totalSpeakers}
  confirmed={confirmedSpeakers}
  pending={pendingSpeakers}
/>
<input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search Speaker..."
  className="w-full p-4 rounded bg-slate-700 mb-6"
/>

      {/* Form */}

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4">
  {editingSpeaker
    ? "Edit Speaker"
    : "Add Speaker"}
</h2>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Speaker Name"
            className="w-full p-4 rounded bg-slate-700"
          />

          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            className="w-full p-4 rounded bg-slate-700"
          />

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
            className="w-full p-4 rounded bg-slate-700"
          />

          <button
  onClick={addSpeaker}
  className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded font-bold"
>
  {editingSpeaker
    ? "Update Speaker"
    : "Add Speaker"}
</button>
        </div>
      </div>

      {/* Table */}

      <div className="bg-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Company</th>
              <th className="text-left p-4">Topic</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSpeakers.map((speaker) => (
              <tr
                key={speaker.id}
                className="border-t border-slate-700"
              >
                <td className="p-4">{speaker.name}</td>
                <td className="p-4">{speaker.company}</td>
                <td className="p-4">{speaker.topic}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      speaker.status === "Confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {speaker.status}
                  </span>
                </td>

                <td className="p-4 space-x-2">
  <button
    onClick={() => editSpeaker(speaker)}
    className="bg-cyan-500 px-4 py-2 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => deleteSpeaker(speaker.id)}
    className="bg-red-500 px-4 py-2 rounded"
  >
    Delete
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}