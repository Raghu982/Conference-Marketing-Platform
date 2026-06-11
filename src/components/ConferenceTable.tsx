import { useEffect, useState } from "react";
import axios from "axios";

export default function ConferenceTable() {
  const [conferences, setConferences] =
    useState<any[]>([]);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:5000/api/conferences"
        );

      setConferences(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Conferences
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-slate-400 border-b border-slate-700">
            <th className="text-left py-3">
              Conference
            </th>

            <th className="text-left py-3">
              Location
            </th>

            <th className="text-left py-3">
              Date
            </th>

            <th className="text-left py-3">
              Attendees
            </th>
          </tr>
        </thead>

        <tbody>
          {conferences.map(
            (conference) => (
              <tr
                key={conference.id}
                className="border-b border-slate-700"
              >
                <td className="py-3">
                  {conference.name}
                </td>

                <td className="py-3">
                  {conference.location}
                </td>

                <td className="py-3">
                  {conference.date}
                </td>

                <td className="py-3">
                  {conference.attendees}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}