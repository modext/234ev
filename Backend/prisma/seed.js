const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Starter data reflecting the real, current EV landscape in Nigeria.
// Replace/expand these with verified entries as you build out your directory —
// treat this as scaffolding, not a finished dataset.
async function main() {
  await prisma.tip.createMany({
    data: [
      {
        title: "Home solar charging is still your most reliable option",
        body: "With fewer than 80 public fast chargers nationwide, most EV owners in Lagos and Abuja charge overnight from a home solar + inverter setup. Budget ₦3M–₦8M for a capable EV-compatible system if you don't already have one.",
        category: "cost-saving",
      },
      {
        title: "Always confirm connector type before a long trip",
        body: "Public stations vary between CCS2, Type 2, and swap-standard connectors. Call ahead or check recent user reports in the app before relying on a station you haven't used before.",
        category: "route-planning",
      },
      {
        title: "Lagos–Abuja still needs careful planning",
        body: "The 750km Lagos–Abuja corridor doesn't yet have a reliable fast-charging chain. Plan overnight stops around known operational stations, and have a backup (generator/solar) plan.",
        category: "route-planning",
      },
    ],
  });

  await prisma.station.createMany({
    data: [
      {
        name: "Sheraton Lagos (Qoray Fast Charger)",
        type: "PLUG_IN_DC_FAST",
        status: "OPERATIONAL",
        operator: "Qoray",
        latitude: 6.4531,
        longitude: 3.4488,
        city: "Lagos",
        state: "Lagos",
        connectorType: "CCS2",
        address: "Sheraton Lagos Hotel, Ikeja",
        verified: true,
      },
      {
        name: "Mega Plaza Rooftop Charger",
        type: "PLUG_IN_AC",
        status: "OPERATIONAL",
        operator: "SAGLEV",
        latitude: 6.4281,
        longitude: 3.4219,
        city: "Lagos",
        state: "Lagos",
        connectorType: "Type 2",
        address: "Mega Plaza, Victoria Island",
        verified: true,
      },
      {
        name: "A.Y.M Shafa Filling Station (Abuja Pilot)",
        type: "PLUG_IN_DC_FAST",
        status: "OPERATIONAL",
        operator: "NNPC / Shafa Energy",
        latitude: 9.0579,
        longitude: 7.4951,
        city: "Abuja",
        state: "FCT",
        address: "Wuse, Abuja",
        verified: true,
      },
    ],
  });

  await prisma.shop.createMany({
    data: [
      {
        name: "Innoson EV Service Center",
        specialty: ["battery", "general EV diagnostics"],
        latitude: 6.4413,
        longitude: 3.4227,
        city: "Lagos",
        state: "Lagos",
        address: "Lagos service center (verify current address before listing publicly)",
        verified: false,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
