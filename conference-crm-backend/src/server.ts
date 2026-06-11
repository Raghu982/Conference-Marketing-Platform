import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import conferenceRoutes from "./routes/conferenceRoutes";
import speakerRoutes from "./routes/speakerRoutes";
import sponsorRoutes from "./routes/sponsorRoutes";
import leadRoutes from "./routes/leadRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "Conference CRM Backend Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/conferences", conferenceRoutes);
app.use("/api/speakers", speakerRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});