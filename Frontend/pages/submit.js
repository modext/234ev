import { useState } from "react";
import { api } from "../lib/api";

const TYPES = [
  { key: "NEW_STATION", label: "Charging / swap spot" },
  { key: "NEW_SHOP", label: "Maintenance shop" },
];

export default function Submit() {
  const [type, setType] = useState("NEW_STATION");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !city) return;
    setSubmitting(true);
    try {
      await api.submit(type, { name, city, notes, state: city }, contact);
      setDone(true);
      setName("");
      setCity("");
      setNotes("");
      setContact("");
    } catch (err) {
      alert(`Couldn't submit: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container" style={styles.page}>
      <span style={styles.eyebrow}>CONTRIBUTE</span>
      <h1 style={styles.heading}>Add a spot or shop</h1>
      <p style={styles.subheading}>
        There's no official directory for this yet — every listing here comes from someone like you.
      </p>

      {done && (
        <div style={styles.successBanner}>
          Thanks — your submission is queued for review and will show up once verified.
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={styles.form}>
        <div style={styles.typeRow}>
          {TYPES.map((t) => (
            <button
              type="button"
              key={t.key}
              onClick={() => setType(t.key)}
              style={{
                ...styles.typeButton,
                background: type === t.key ? "var(--color-primary)" : "transparent",
                color: type === t.key ? "#fff" : "var(--color-primary)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label style={styles.label}>
          Name
          <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label style={styles.label}>
          City
          <input style={styles.input} value={city} onChange={(e) => setCity(e.target.value)} required />
        </label>

        <label style={styles.label}>
          Notes
          <textarea
            style={{ ...styles.input, height: 90, resize: "vertical" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Connector type, hours, anything useful"
          />
        </label>

        <label style={styles.label}>
          Your contact (optional, for follow-up)
          <input style={styles.input} value={contact} onChange={(e) => setContact(e.target.value)} />
        </label>

        <button type="submit" disabled={submitting} style={styles.submitButton}>
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </form>
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
  subheading: { marginTop: 10, color: "var(--color-muted)", maxWidth: 560, lineHeight: 1.6, marginBottom: 28 },
  successBanner: {
    background: "#E7F4EC",
    color: "var(--color-primary-dark)",
    padding: "12px 16px",
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
  },
  form: { padding: 28, maxWidth: 480, display: "flex", flexDirection: "column", gap: 16 },
  typeRow: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 4 },
  typeButton: {
    flex: 1,
    border: "1px solid var(--color-primary)",
    borderRadius: 8,
    padding: "10px 12px",
    fontWeight: 600,
    fontSize: 14,
  },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: 14, fontWeight: 500 },
  input: {
    border: "1px solid var(--color-border)",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14,
    fontFamily: "var(--font-body)",
  },
  submitButton: {
    background: "var(--color-primary)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 16px",
    fontWeight: 700,
    fontSize: 15,
    marginTop: 4,
  },
};
