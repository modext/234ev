export default function Download() {
  return (
    <div className="container" style={styles.page}>
      <span style={styles.eyebrow}>MOBILE APP</span>
      <h1 style={styles.heading}>Download the 234ev app</h1>
      <p style={styles.subheading}>
        Take charging stations, shop listings, and tips with you on the road. The app is coming
        soon — sign up to get notified when it launches.
      </p>

      <div className="card" style={styles.card}>
        <h3 style={styles.sectionTitle}>What you'll get</h3>
        <ul style={styles.list}>
          <li>Offline access to nearby charging stations</li>
          <li>Push alerts when chargers near you are reported down</li>
          <li>Quick-submit for new spots from your phone</li>
          <li>One-tap directions to chargers and shops</li>
        </ul>
      </div>

      <div className="card download-form-card" style={styles.notifyCard}>
        <h3 style={styles.sectionTitle}>Get notified at launch</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks — we'll let you know when the app is ready.");
          }}
          style={styles.form}
        >
          <input
            type="email"
            placeholder="your@email.com"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Notify me
          </button>
        </form>
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
  notifyCard: { maxWidth: 480 },
  form: { display: "flex", flexDirection: "column", gap: 12, marginTop: 4 },
  input: {
    border: "1px solid var(--color-border)",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14,
    fontFamily: "var(--font-body)",
  },
  button: {
    background: "var(--color-primary)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 16px",
    fontWeight: 700,
    fontSize: 15,
  },
};
