import { useState, useEffect } from "react";

type Props = {
  onAddConference: (
    name: string,
    city: string
  ) => void;

  editingConference?: any;
};

export default function ConferenceForm({
  onAddConference,
  editingConference,
}: Props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (editingConference) {
      setName(editingConference.name);
      setCity(editingConference.city);
    }
  }, [editingConference]);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !city) return;

    onAddConference(name, city);

    setName("");
    setCity("");
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl mb-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingConference
          ? "Edit Conference"
          : "Add Conference"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="w-full p-3 rounded bg-slate-700"
          placeholder="Conference Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="w-full p-3 rounded bg-slate-700"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <button
          className="bg-cyan-500 px-4 py-3 rounded font-bold"
        >
          {editingConference
            ? "Update Conference"
            : "Create Conference"}
        </button>
      </form>
    </div>
  );
}