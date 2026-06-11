import { useEffect, useState } from "react";
import axios from "axios";

import LeadConversionChart from "../components/LeadConversionChart";
import SponsorRevenueChart from "../components/SponsorRevenueChart";
import RevenueChart from "../components/RevenueChart";
import RegistrationChart from "../components/RegistrationChart";
import AnalyticsCard from "../components/AnalyticsCard";

import { exportAnalyticsCSV } from "../utils/exportAnalytics";
import { exportAnalyticsPDF } from "../utils/exportAnalyticsPdf";

interface Conference {
  name: string;
  date: string;
  attendees?: number;
}

interface Sponsor {
  name: string;
  amount: number | string;
}

interface Lead {
  value?: number;
  stage?: string;
}

interface TopConference {
  name: string;
  attendees: number;
}

export default function Analytics() {
  const [conferenceCount, setConferenceCount] =
    useState(0);

  const [speakerCount, setSpeakerCount] =
    useState(0);

  const [sponsorCount, setSponsorCount] =
    useState(0);

  const [leadCount, setLeadCount] =
    useState(0);

  const [attendeeCount, setAttendeeCount] =
    useState(0);

  const [sponsorRevenue, setSponsorRevenue] =
    useState(0);

  const [pipelineValue, setPipelineValue] =
    useState(0);

  const [wonLeads, setWonLeads] =
    useState(0);

  const [conversionRate, setConversionRate] =
    useState(0);

  const [activeConferences, setActiveConferences] =
    useState(0);

  const [topSponsor, setTopSponsor] =
    useState<Sponsor | null>(null);

  const [topConference, setTopConference] =
    useState<TopConference | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
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

      const active =
        conferences.filter(
          (conf) =>
            new Date(conf.date) >
            new Date()
        ).length;

      setActiveConferences(active);

      const totalAttendees =
        conferences.reduce(
          (sum, conf) =>
            sum +
            Number(
              conf.attendees || 0
            ),
          0
        );

      setAttendeeCount(
        totalAttendees
      );

      const totalSponsorRevenue =
        sponsors.reduce(
          (sum, sponsor) => {
            const amount = Number(
              sponsor.amount
            );

            if (isNaN(amount))
              return sum;

            return sum + amount;
          },
          0
        );

      setSponsorRevenue(
        totalSponsorRevenue
      );

      const totalPipelineValue =
        leads.reduce(
          (sum, lead) =>
            sum +
            Number(
              lead.value || 0
            ),
          0
        );

      setPipelineValue(
        totalPipelineValue
      );

      const wonDeals =
        leads.filter(
          (lead) =>
            lead.stage === "Won"
        ).length;

      setWonLeads(
        wonDeals
      );

      const conversion =
        leads.length > 0
          ? (
              (wonDeals /
                leads.length) *
              100
            ).toFixed(1)
          : "0";

      setConversionRate(
        Number(conversion)
      );

      const highestSponsor =
        [...sponsors].sort(
          (a, b) =>
            Number(
              b.amount
            ) -
            Number(
              a.amount
            )
        )[0];

      if (highestSponsor) {
        setTopSponsor(
          highestSponsor
        );
      }

      const highestConference =
        [...conferences].sort(
          (a, b) =>
            Number(
              b.attendees || 0
            ) -
            Number(
              a.attendees || 0
            )
        )[0];

      if (highestConference) {
        setTopConference({
          name:
            highestConference.name,
          attendees:
            highestConference.attendees ||
            0,
        });
      }
    } catch (error) {
      console.error(
        "Analytics Load Error:",
        error
      );
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() =>
            exportAnalyticsCSV({
              conferences:
                conferenceCount,
              speakers:
                speakerCount,
              sponsors:
                sponsorCount,
              leads: leadCount,
              attendees:
                attendeeCount,
              sponsorRevenue,
              pipelineValue,
              wonDeals:
                wonLeads,
              conversionRate,
              activeConferences,
            })
          }
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg font-semibold"
        >
          Export CSV
        </button>

        <button
          onClick={() =>
            exportAnalyticsPDF({
              conferences:
                conferenceCount,
              speakers:
                speakerCount,
              sponsors:
                sponsorCount,
              leads: leadCount,
              attendees:
                attendeeCount,
              sponsorRevenue,
              pipelineValue,
              wonDeals:
                wonLeads,
              conversionRate,
              activeConferences,
            })
          }
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
        >
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <AnalyticsCard title="Conferences" value={conferenceCount.toString()} />
        <AnalyticsCard title="Speakers" value={speakerCount.toString()} />
        <AnalyticsCard title="Sponsors" value={sponsorCount.toString()} />
        <AnalyticsCard title="Leads" value={leadCount.toString()} />
        <AnalyticsCard title="Attendees" value={attendeeCount.toString()} />
        <AnalyticsCard title="Sponsor Revenue" value={`₹${sponsorRevenue.toLocaleString()}`} />
        <AnalyticsCard title="Pipeline Value" value={`₹${pipelineValue.toLocaleString()}`} />
        <AnalyticsCard title="Won Deals" value={wonLeads.toString()} />
        <AnalyticsCard title="Conversion Rate" value={`${conversionRate}%`} />
        <AnalyticsCard title="Active Conferences" value={activeConferences.toString()} />
      </div>

      {topSponsor && (
        <div className="bg-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Top Sponsor
          </h2>

          <p className="text-xl font-semibold">
            {topSponsor.name}
          </p>

          <p className="text-cyan-400 text-lg">
            ₹{Number(topSponsor.amount).toLocaleString()}
          </p>
        </div>
      )}

      {topConference && (
        <div className="bg-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Top Conference
          </h2>

          <p className="text-xl font-semibold">
            {topConference.name}
          </p>

          <p className="text-cyan-400 text-lg">
            {topConference.attendees.toLocaleString()} Attendees
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <RevenueChart />
        <RegistrationChart />
        <LeadConversionChart />
        <SponsorRevenueChart />
      </div>
    </div>
  );
}