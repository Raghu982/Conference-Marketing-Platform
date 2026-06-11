import { useEffect, useState } from "react";
import axios from "axios";

export default function SpeakerList() {
  const [speakers, setSpeakers] =
    useState<any[]>([]);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:5000/api/speakers"
        );

      setSpeakers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Recent Speakers
      </h2>

      <div className="space-y-3">
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="bg-slate-700 p-3 rounded-lg"
          >
            <div className="font-semibold">
              {speaker.name}
            </div>

            <div className="text-sm text-slate-400">
              {speaker.company}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}