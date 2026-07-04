const express = require("express");
const { z } = require("zod");
const prisma = require("../lib/prisma");
const { distanceKm } = require("../lib/distance");

const router = express.Router();

// GET /api/stations?city=Lagos&type=BATTERY_SWAP&lat=6.5&lng=3.4&radiusKm=15
router.get("/", async (req, res) => {
  const { city, type, lat, lng, radiusKm } = req.query;

  const where = {};
  if (city) where.city = { equals: city, mode: "insensitive" };
  if (type) where.type = type;

  const stations = await prisma.station.findMany({ where });

  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const radius = radiusKm ? parseFloat(radiusKm) : 25;

    const withDistance = stations
      .map((s) => ({
        ...s,
        distanceKm: distanceKm(userLat, userLng, s.latitude, s.longitude),
      }))
      .filter((s) => s.distanceKm <= radius)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return res.json(withDistance);
  }

  res.json(stations);
});

// GET /api/stations/:id
router.get("/:id", async (req, res) => {
  const station = await prisma.station.findUnique({
    where: { id: req.params.id },
    include: { reports: { orderBy: { createdAt: "desc" }, take: 10 } },
  });
  if (!station) return res.status(404).json({ error: "Station not found" });
  res.json(station);
});

const statusReportSchema = z.object({
  working: z.boolean(),
  note: z.string().max(300).optional(),
});

// POST /api/stations/:id/report — quick "still working?" ping from a user
router.post("/:id/report", async (req, res) => {
  const parsed = statusReportSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const station = await prisma.station.findUnique({ where: { id: req.params.id } });
  if (!station) return res.status(404).json({ error: "Station not found" });

  const report = await prisma.statusReport.create({
    data: {
      stationId: req.params.id,
      working: parsed.data.working,
      note: parsed.data.note,
    },
  });

  // Simple heuristic: if reported not working, flip status to DOWN for visibility.
  // A real moderation flow can refine this later (e.g. require N reports).
  if (!parsed.data.working) {
    await prisma.station.update({
      where: { id: req.params.id },
      data: { status: "DOWN" },
    });
  }

  res.status(201).json(report);
});

module.exports = router;
