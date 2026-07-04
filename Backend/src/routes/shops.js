const express = require("express");
const { z } = require("zod");
const prisma = require("../lib/prisma");
const { distanceKm } = require("../lib/distance");

const router = express.Router();

// GET /api/shops?city=Lagos&lat=..&lng=..&radiusKm=15
router.get("/", async (req, res) => {
  const { city, lat, lng, radiusKm } = req.query;

  const where = {};
  if (city) where.city = { equals: city, mode: "insensitive" };

  const shops = await prisma.shop.findMany({ where });

  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const radius = radiusKm ? parseFloat(radiusKm) : 25;

    const withDistance = shops
      .map((s) => ({
        ...s,
        distanceKm: distanceKm(userLat, userLng, s.latitude, s.longitude),
      }))
      .filter((s) => s.distanceKm <= radius)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return res.json(withDistance);
  }

  res.json(shops);
});

router.get("/:id", async (req, res) => {
  const shop = await prisma.shop.findUnique({
    where: { id: req.params.id },
    include: { reviews: { orderBy: { createdAt: "desc" }, take: 20 } },
  });
  if (!shop) return res.status(404).json({ error: "Shop not found" });
  res.json(shop);
});

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
  authorName: z.string().max(60).optional(),
});

// POST /api/shops/:id/reviews
router.post("/:id/reviews", async (req, res) => {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const shop = await prisma.shop.findUnique({ where: { id: req.params.id } });
  if (!shop) return res.status(404).json({ error: "Shop not found" });

  const review = await prisma.review.create({
    data: { shopId: req.params.id, ...parsed.data },
  });

  // Recalculate running average rating
  const agg = await prisma.review.aggregate({
    where: { shopId: req.params.id },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.shop.update({
    where: { id: req.params.id },
    data: {
      avgRating: agg._avg.rating || 0,
      ratingCount: agg._count.rating,
    },
  });

  res.status(201).json(review);
});

module.exports = router;
