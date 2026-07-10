import { useEffect, useState } from "react";
import { api } from "../lib/api";

const DEFAULT_LOCATION = { lat: 6.5244, lng: 3.3792 };

export default function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      load(DEFAULT_LOCATION);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => load({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => load(DEFAULT_LOCATION)
    );
  }, []);

  async function load(loc) {
    try {
      const results = await api.getShopsNearby(loc.lat, loc.lng, 50);
      setShops(results);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={styles.page}>
      <span style={styles.eyebrow}>DIRECTORY</span>
      <h1 style={styles.heading}>Maintenance Shops</h1>
      <p style={styles.subheading}>
        Generic mechanics can miss EV-specific issues. These are shops other owners vouch for.
      </p>

      {loading ? (
        <p style={{ color: "var(--color-muted)" }}>Loading shops near you…</p>
      ) : shops.length === 0 ? (
        <div className="card" style={styles.empty}>
          <p>No shops listed near you yet.</p>
          <a href="/submit" style={styles.emptyLink}>Add the first one →</a>
        </div>
      ) : (
        <div style={styles.grid}>
          {shops.map((shop) => (
            <div key={shop.id} className="card" style={styles.card}>
              <h3 style={styles.shopName}>{shop.name}</h3>
              <p style={styles.specialty}>{shop.specialty.join(" · ")}</p>
              <p className="mono" style={styles.meta}>
                {shop.avgRating ? `★ ${shop.avgRating.toFixed(1)} (${shop.ratingCount})` : "No ratings yet"}
                {shop.distanceKm != null ? ` · ${shop.distanceKm.toFixed(1)} km away` : ""}
              </p>
              <div style={styles.actions}>
                {shop.whatsapp && (
                  <a href={`https://wa.me/${shop.whatsapp}`} style={styles.actionLink}>
                    WhatsApp
                  </a>
                )}
                {shop.phone && (
                  <a href={`tel:${shop.phone}`} style={styles.actionLink}>
                    Call
                  </a>
                )}
              </div>
            </div>
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  card: { padding: 20 },
  shopName: { fontSize: 16 },
  specialty: { color: "var(--color-muted)", fontSize: 14, marginTop: 6 },
  meta: { fontSize: 12, color: "var(--color-muted)", marginTop: 10 },
  actions: { display: "flex", gap: 16, marginTop: 14 },
  actionLink: { color: "var(--color-primary)", fontWeight: 600, fontSize: 14 },
  empty: { padding: 32, textAlign: "center", color: "var(--color-muted)" },
  emptyLink: { color: "var(--color-primary)", fontWeight: 600, display: "inline-block", marginTop: 8 },
};
