import { useEffect, useState } from "react";
import axios from "axios";

export default function GlobalSearch() {
  const [search, setSearch] = useState("");

  const [conferences, setConferences] =
    useState<any[]>([]);

  const [speakers, setSpeakers] =
    useState<any[]>([]);

  const [sponsors, setSponsors] =
    useState<any[]>([]);

  const [leads, setLeads] =
    useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        conferencesRes,
        speakersRes,
        sponsorsRes,
        leadsRes,
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

      setConferences(
        conferencesRes.data
      );

      setSpeakers(
        speakersRes.data
      );

      setSponsors(
        sponsorsRes.data
      );

      setLeads(
        leadsRes.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const data = [
    ...conferences.map((c) => ({
      type: "Conference",
      title: c.name,
      details: c.location,
    })),

    ...speakers.map((s) => ({
      type: "Speaker",
      title: s.name,
      details: `${s.company} • ${s.topic}`,
    })),

    ...sponsors.map((s) => ({
      type: "Sponsor",
      title: s.name,
      details: `${s.tier} Sponsor`,
    })),

    ...leads.map((l) => ({
      type: "Lead",
      title: l.name,
      details: `${l.company} • ${l.email}`,
    })),
  ];

  const results = data.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      item.details
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Global Search
      </h2>

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search conferences, speakers, sponsors, leads..."
        className="w-full p-4 rounded bg-slate-700 mb-4"
      />

      <div className="space-y-2">
        {results.map(
          (item, index) => (
            <div
              key={index}
              className="bg-slate-700 p-3 rounded"
            >
              <div>
                <span className="text-cyan-400 font-bold">
                  [{item.type}]
                </span>{" "}
                {item.title}
              </div>

              <div className="text-sm text-slate-400">
                {item.details}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}