import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ConferenceTable from "../components/ConferenceTable";
import SpeakerList from "../components/SpeakerList";
import SponsorList from "../components/SponsorList";
import ActivityFeed from "../components/ActivityFeed";
import AnalyticsCard from "../components/AnalyticsCard";

interface Sponsor {
  amount: number | string;
}

interface Lead {
  value?: number;
  stage?: string;
}

interface Conference {
  date: string;
}

export default function Dashboard() {
  const [conferenceCount, setConferenceCount] =
    useState(0);

  const [speakerCount, setSpeakerCount] =
    useState(0);

  const [sponsorCount, setSponsorCount] =
    useState(0);

  const [leadCount, setLeadCount] =
    useState(0);

  const [sponsorRevenue, setSponsorRevenue] =
    useState(0);

  const [pipelineValue, setPipelineValue] =
    useState(0);

  const [conversionRate, setConversionRate] =
    useState(0);

  const [activeConferences, setActiveConferences] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
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

      const conferences: Conference[] =
        conferencesRes.data || [];

      const sponsors: Sponsor[] =
        sponsorsRes.data || [];

      const leads: Lead[] =
        leadsRes.data || [];

      setConferenceCount(
        conferences.length
      );

      setSpeakerCount(
        speakersRes.data.length
      );

      setSponsorCount(
        sponsors.length
      );

      setLeadCount(
        leads.length
      );

      const revenue =
        sponsors.reduce(
          (sum, sponsor) =>
            sum +
            Number(
              sponsor.amount || 0
            ),
          0
        );

      setSponsorRevenue(
        revenue
      );

      const pipeline =
        leads.reduce(
          (sum, lead) =>
            sum +
            Number(
              lead.value || 0
            ),
          0
        );

      setPipelineValue(
        pipeline
      );

      const wonDeals =
        leads.filter(
          (lead) =>
            lead.stage === "Won"
        ).length;

      const conversion =
        leads.length
          ? (
              (wonDeals /
                leads.length) *
              100
            ).toFixed(1)
          : "0";

      setConversionRate(
        Number(conversion)
      );

      const active =
        conferences.filter(
          (conf) =>
            new Date(conf.date) >
            new Date()
        ).length;

      setActiveConferences(
        active
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        Loading Dashboard...
      </div>
    );
  }

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

        {/* KPI Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-6">
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

        {/* Executive Metrics */}

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <AnalyticsCard
            title="Sponsor Revenue"
            value={`₹${sponsorRevenue.toLocaleString()}`}
          />

          <AnalyticsCard
            title="Pipeline Value"
            value={`₹${pipelineValue.toLocaleString()}`}
          />

          <AnalyticsCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
          />

          <AnalyticsCard
            title="Active Conferences"
            value={activeConferences.toString()}
          />
        </div>

        {/* Quick Actions */}

        <div className="bg-slate-900 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg">
              Add Conference
            </button>

            <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg">
              Add Speaker
            </button>

            <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg">
              Add Sponsor
            </button>

            <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg">
              Add Lead
            </button>
          </div>
        </div>

        <ConferenceTable />

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <SpeakerList />
          <SponsorList />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}