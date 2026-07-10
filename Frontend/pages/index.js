import Link from "next/link";

const FEATURES = [
  {
    title: "Charging Stations",
    description: "Live map of chargers and swap spots with real driver reports on what's working.",
    href: "/stations",
    cta: "View map",
  },
  {
    title: "Maintenance Shops",
    description: "EV-aware mechanics and service centres vouched for by other owners.",
    href: "/shops",
    cta: "Find shops",
  },
  {
    title: "Tips",
    description: "Practical advice for driving electric in Nigeria — routes, costs, and more.",
    href: "/tips",
    cta: "Read tips",
  },
  {
    title: "Add a spot",
    description: "Know a charger or shop that's missing? Help build the directory.",
    href: "/submit",
    cta: "Contribute",
  },
];

export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <span style={styles.eyebrow}>234EV · NIGERIA'S EV DIRECTORY</span>
          <h1 style={styles.heading}>Everything you need to drive electric in Nigeria.</h1>
          <p style={styles.subheading}>
            Find working chargers, trusted maintenance shops, and field-tested tips — built by
            drivers, for drivers.
          </p>
          <div className="hero-actions" style={styles.actions}>
            <Link href="/stations" style={styles.primaryButton}>
              Find charging stations
            </Link>
            <Link href="/download" style={styles.secondaryButton}>
              Download app
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={styles.features}>
        <div className="feature-grid" style={styles.grid}>
          {FEATURES.map((feature) => (
            <div key={feature.href} className="card" style={styles.card}>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardBody}>{feature.description}</p>
              <Link href={feature.href} style={styles.cardLink}>
                {feature.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  eyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.08em",
    color: "var(--color-primary)",
  },
  heading: {
    fontSize: "clamp(32px, 5vw, 48px)",
    marginTop: 12,
    maxWidth: 680,
    lineHeight: 1.15,
  },
  subheading: {
    marginTop: 16,
    color: "var(--color-muted)",
    maxWidth: 560,
    lineHeight: 1.6,
    fontSize: "clamp(15px, 2vw, 17px)",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 28,
  },
  primaryButton: {
    background: "var(--color-primary)",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 15,
  },
  secondaryButton: {
    border: "1px solid var(--color-border)",
    background: "var(--color-surface)",
    color: "var(--color-text)",
    padding: "12px 22px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 15,
  },
  features: {
    padding: "48px 20px 60px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  },
  card: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  cardTitle: { fontSize: 18 },
  cardBody: { color: "var(--color-muted)", lineHeight: 1.6, fontSize: 14, flex: 1 },
  cardLink: { color: "var(--color-primary)", fontWeight: 600, fontSize: 14, marginTop: 8 },
};
