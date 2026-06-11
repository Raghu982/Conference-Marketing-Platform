import { useEffect, useState } from "react";
import axios from "axios";

export default function ActivityFeed() {
  const [activities, setActivities] =
    useState<string[]>([]);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      const [
        conferences,
        speakers,
        sponsors,
        leads,
      ] = await Promise.all([
        axios.get(
          "http://localhost:5000/api/conferences"
        ),
        axios.get(
          "http://localhost:5000/api/speakers"
        ),
        axios.get(
          "http://localhost:5000/api/sponsors"
        ),
        axios.get(
          "http://localhost:5000/api/leads"
        ),
      ]);

      const items = [
        ...conferences.data.map(
          (c: any) =>
            `Conference Added - ${c.name}`
        ),
        ...speakers.data.map(
          (s: any) =>
            `Speaker Added - ${s.name}`
        ),
        ...sponsors.data.map(
          (s: any) =>
            `Sponsor Added - ${s.name}`
        ),
        ...leads.data.map(
          (l: any) =>
            `Lead Added - ${l.name}`
        ),
      ];

      setActivities(items.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Recent Activity
      </h2>

      <div className="space-y-3">
        {activities.map(
          (item, index) => (
            <div
              key={index}
              className="bg-slate-700 p-3 rounded-lg text-slate-200"
            >
              {item}
            </div>
          )
        )}
      </div>
    </div>
  );
}