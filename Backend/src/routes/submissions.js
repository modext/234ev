const express = require("express");
const { z } = require("zod");
const prisma = require("../lib/prisma");

const router = express.Router();

const submissionSchema = z.object({
  type: z.enum(["NEW_STATION", "NEW_SHOP", "STATUS_UPDATE", "CORRECTION"]),
  payload: z.record(z.any()), // flexible — validated more strictly per-type when approved
  targetId: z.string().optional(),
  contactInfo: z.string().max(120).optional(),
});

// POST /api/submissions — anyone can submit; goes to PENDING for review
router.post("/", async (req, res) => {
  const parsed = submissionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const submission = await prisma.submission.create({ data: parsed.data });
  res.status(201).json(submission);
});

// GET /api/submissions?status=PENDING — for an admin review screen later
router.get("/", async (req, res) => {
  const { status } = req.query;
  const where = status ? { status } : {};
  const submissions = await prisma.submission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(submissions);
});

// POST /api/submissions/:id/approve — promotes a NEW_STATION / NEW_SHOP submission
// into the real table. Kept intentionally simple for MVP (no admin auth yet —
// add that before opening this endpoint publicly).
router.post("/:id/approve", async (req, res) => {
  const submission = await prisma.submission.findUnique({
    where: { id: req.params.id },
  });
  if (!submission) return res.status(404).json({ error: "Submission not found" });

  let created = null;
  if (submission.type === "NEW_STATION") {
    created = await prisma.station.create({ data: submission.payload });
  } else if (submission.type === "NEW_SHOP") {
    created = await prisma.shop.create({ data: submission.payload });
  }

  await prisma.submission.update({
    where: { id: req.params.id },
    data: { status: "APPROVED", reviewedAt: new Date() },
  });

  res.json({ submission, created });
});

router.post("/:id/reject", async (req, res) => {
  const submission = await prisma.submission.update({
    where: { id: req.params.id },
    data: { status: "REJECTED", reviewedAt: new Date() },
  });
  res.json(submission);
});

module.exports = router;
