import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="container" style={styles.page}>
      <span style={styles.eyebrow}>CONTACT</span>
      <h1 style={styles.heading}>Get in touch</h1>
      <p style={styles.subheading}>
        Questions, feedback, or partnership enquiries — we'd love to hear from you.
      </p>

      {submitted && (
        <div style={styles.successBanner}>
          Thanks for reaching out. We'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="card contact-form-card" style={styles.form}>
        <label style={styles.label}>
          Name
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label style={styles.label}>
          Email
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label style={styles.label}>
          Message
          <textarea
            style={{ ...styles.input, height: 120, resize: "vertical" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        <button type="submit" style={styles.submitButton}>
          Send message
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
  subheading: {
    marginTop: 10,
    color: "var(--color-muted)",
    maxWidth: 560,
    lineHeight: 1.6,
    marginBottom: 28,
  },
  successBanner: {
    background: "#E7F4EC",
    color: "var(--color-primary-dark)",
    padding: "12px 16px",
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
    maxWidth: 480,
  },
  form: {
    padding: 28,
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    gap: 16,
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
