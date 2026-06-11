export const exportAnalyticsCSV = (
  analytics: {
    conferences: number;
    speakers: number;
    sponsors: number;
    leads: number;
    attendees: number;
    sponsorRevenue: number;
    pipelineValue: number;
    wonDeals: number;
    conversionRate: number;
    activeConferences: number;
  }
) => {
  const csv = [
    ["Metric", "Value"],
    ["Conferences", analytics.conferences],
    ["Speakers", analytics.speakers],
    ["Sponsors", analytics.sponsors],
    ["Leads", analytics.leads],
    ["Attendees", analytics.attendees],
    ["Sponsor Revenue", analytics.sponsorRevenue],
    ["Pipeline Value", analytics.pipelineValue],
    ["Won Deals", analytics.wonDeals],
    ["Conversion Rate", analytics.conversionRate],
    ["Active Conferences", analytics.activeConferences],
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    "conference-analytics.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};