import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ConferenceTable from "../components/ConferenceTable";
import ActivityFeed from "../components/ActivityFeed";
import SpeakerList from "../components/SpeakerList";
import SponsorList from "../components/SponsorList";
import AnalyticsCard from "../components/AnalyticsCard";
import { conferenceService } from "../services/conferenceService";
import { speakerService } from "../services/speakerService";
import { sponsorService } from "../services/sponsorService";
import { leadService } from "../services/leadService";

export default function Dashboard() {
    const conferenceCount =
    conferenceService.getAll().length;

  const speakerCount =
    speakerService.getAll().length;

  const sponsorCount =
    sponsorService.getAll().length;

  const leadCount =
    leadService.getAll().length;  
  return (
  <div className="flex-1 bg-slate-950 text-white min-h-screen">
    <Navbar />

    <div className="p-6">

      <h1 className="text-4xl font-bold mb-2">
        Conference Marketing Platform
      </h1>

      <p className="text-slate-400 mb-8">
        Welcome back, Admin
      </p>

      <div className="grid grid-cols-4 gap-6 mb-6">
  <StatCard
    title="Conferences"
    value={conferenceCount.toString()}
  />

  <StatCard
    title="Speakers"
    value={speakerCount.toString()}
  />

  <StatCard
    title="Sponsors"
    value={sponsorCount.toString()}
  />

  <StatCard
    title="Leads"
    value={leadCount.toString()}
  />
</div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <AnalyticsCard
          title="Revenue"
          value="₹18.4L"
        />

        <AnalyticsCard
          title="Open Rate"
          value="42%"
        />

        <AnalyticsCard
          title="Conversion Rate"
          value="18%"
        />
      </div>

      <ConferenceTable />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <SpeakerList />
        <SponsorList />
        <ActivityFeed />
      </div>

    </div>
  </div>
);
}