const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

// GET /api/tips?category=cost-saving
router.get("/", async (req, res) => {
  const { category } = req.query;
  const where = category ? { category } : {};
  const tips = await prisma.tip.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(tips);
});

router.get("/:id", async (req, res) => {
  const tip = await prisma.tip.findUnique({ where: { id: req.params.id } });
  if (!tip) return res.status(404).json({ error: "Tip not found" });
  res.json(tip);
});

module.exports = router;
