import { useEffect, useState } from "react";
import axios from "axios";

export default function SponsorList() {
  const [sponsors, setSponsors] =
    useState<any[]>([]);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:5000/api/sponsors"
        );

      setSponsors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Recent Sponsors
      </h2>

      <div className="space-y-3">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="bg-slate-700 p-3 rounded-lg"
          >
            <div className="font-semibold">
              {sponsor.name}
            </div>

            <div className="text-sm text-slate-400">
              {sponsor.tier} Sponsor
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}