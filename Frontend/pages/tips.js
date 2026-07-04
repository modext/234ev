import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTips()
      .then(setTips)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container" style={styles.page}>
      <span style={styles.eyebrow}>FIELD NOTES</span>
      <h1 style={styles.heading}>Tips for driving electric in Nigeria</h1>
      <p style={styles.subheading}>
        Practical, crowd-tested advice — from cost-saving to route planning.
      </p>

      {loading ? (
        <p style={{ color: "var(--color-muted)" }}>Loading tips…</p>
      ) : (
        <div style={styles.list}>
          {tips.map((tip) => (
            <article key={tip.id} className="card" style={styles.card}>
              <span className="mono" style={styles.category}>{tip.category.toUpperCase()}</span>
              <h3 style={styles.title}>{tip.title}</h3>
              <p style={styles.body}>{tip.body}</p>
            </article>
          ))}
        </div>
      )}
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
  subheading: { marginTop: 10, color: "var(--color-muted)", maxWidth: 560, lineHeight: 1.6, marginBottom: 32 },
  list: { display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 },
  card: { padding: 22 },
  category: { fontSize: 11, color: "var(--color-primary)", letterSpacing: "0.05em" },
  title: { fontSize: 18, marginTop: 8 },
  body: { marginTop: 8, color: "var(--color-muted)", lineHeight: 1.6 },
};
