import jsPDF from "jspdf";

export const exportAnalyticsPDF = (
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
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(
    "Conference CRM Analytics Report",
    20,
    20
  );

  doc.setFontSize(12);

  let y = 40;

  Object.entries(analytics).forEach(
    ([key, value]) => {
      doc.text(
        `${key}: ${value}`,
        20,
        y
      );

      y += 10;
    }
  );

  doc.save(
    "conference-analytics-report.pdf"
  );
};