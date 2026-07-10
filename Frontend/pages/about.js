import Link from "next/link";

export default function About() {
  return (
    <div className="container" style={styles.page}>
      <span style={styles.eyebrow}>ABOUT</span>
      <h1 style={styles.heading}>Built for Nigerian EV drivers</h1>
      <p style={styles.subheading}>
        234ev is a community-driven directory for electric vehicle owners in Nigeria. There is no
        official national charging map — so we built one together.
      </p>

      <div className="card" style={styles.card}>
        <h3 style={styles.sectionTitle}>What we cover</h3>
        <ul style={styles.list}>
          <li>Public charging and battery-swap stations with live status reports</li>
          <li>Maintenance shops that understand EV-specific needs</li>
          <li>Practical tips from drivers who've been on the road</li>
        </ul>
      </div>

      <div className="card" style={styles.card}>
        <h3 style={styles.sectionTitle}>How it works</h3>
        <p style={styles.body}>
          Every listing comes from a real driver. Submissions are reviewed before they go live,
          and anyone can report whether a charger is working or down. The more people contribute,
          the more useful this becomes for everyone.
        </p>
        <Link href="/submit" style={styles.link}>
          Add a spot or shop →
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "48px 20px 60px" },
  eyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.08em",
    color: "var(--color-primary)",
  },
  heading: { fontSize: "clamp(26px, 3.5vw, 36px)", marginTop: 12 },
  subheading: {
    marginTop: 10,
    color: "var(--color-muted)",
    maxWidth: 560,
    lineHeight: 1.6,
    marginBottom: 32,
  },
  card: { padding: 28, marginBottom: 16, maxWidth: 640 },
  sectionTitle: { fontSize: 18, marginBottom: 12 },
  list: {
    margin: 0,
    paddingLeft: 20,
    color: "var(--color-muted)",
    lineHeight: 1.8,
    fontSize: 15,
  },
  body: { color: "var(--color-muted)", lineHeight: 1.6, fontSize: 15, margin: 0 },
  link: { color: "var(--color-primary)", fontWeight: 600, fontSize: 14, display: "inline-block", marginTop: 16 },
};
