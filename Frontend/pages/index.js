import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { api } from "../lib/api";

// Leaflet touches `window`, so the map must never render during SSR.
const StationMap = dynamic(() => import("../components/StationMap"), { ssr: false });

const DEFAULT_LOCATION = { lat: 6.5244, lng: 3.3792 }; // central Lagos fallback

export default function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      loadStations(DEFAULT_LOCATION);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        loadStations(loc);
      },
      () => loadStations(DEFAULT_LOCATION),
      { timeout: 5000 }
    );
  }, []);

  async function loadStations(loc) {
    try {
      const results = await api.getStationsNearby(loc.lat, loc.lng, 50);
      setStations(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReport(stationId, working) {
    try {
      await api.reportStation(stationId, working);
      alert("Thanks — your report helps other drivers.");
    } catch (err) {
      alert(`Couldn't submit report: ${err.message}`);
    }
  }

  return (
    <div style={styles.page}>
      <section className="container" style={styles.intro}>
        <span style={styles.eyebrow}>LIVE MAP · LAGOS &amp; ABUJA</span>
        <h1 style={styles.heading}>Find a place to charge, right now.</h1>
        <p style={styles.subheading}>
          Real reports from real drivers — fewer than 80 public fast chargers exist nationwide,
          so knowing which ones actually work matters.
        </p>
      </section>

      <section className="container" style={styles.mapWrap}>
        {error && <div style={styles.errorBanner}>Couldn't load live data: {error}</div>}
        <div className="card" style={styles.mapCard}>
          {loading ? (
            <div style={styles.loading}>Locating chargers near you…</div>
          ) : (
            <StationMap userLocation={userLocation} stations={stations} onReport={handleReport} />
          )}
        </div>
        <div style={styles.legend}>
          <LegendDot color="#0B7A4B" label="Operational" />
          <LegendDot color="#A38408" label="Unverified" />
          <LegendDot color="#C0392B" label="Reported down" />
        </div>
      </section>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span style={styles.legendItem}>
      <span style={{ ...styles.legendSwatch, background: color }} />
      {label}
    </span>
  );
}

const styles = {
  page: { paddingBottom: 60 },
  intro: { padding: "48px 20px 24px" },
  eyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.08em",
    color: "var(--color-primary)",
  },
  heading: {
    fontSize: "clamp(28px, 4vw, 42px)",
    marginTop: 12,
    maxWidth: 640,
  },
  subheading: {
    marginTop: 12,
    color: "var(--color-muted)",
    maxWidth: 560,
    lineHeight: 1.6,
  },
  mapWrap: { marginTop: 8 },
  mapCard: {
    height: "60vh",
    minHeight: 420,
    overflow: "hidden",
  },
  loading: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-muted)",
    fontFamily: "var(--font-mono)",
    fontSize: 14,
  },
  errorBanner: {
    background: "#FBEAE8",
    color: "var(--color-danger)",
    padding: "10px 14px",
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  legend: {
    display: "flex",
    gap: 20,
    marginTop: 16,
    fontSize: 13,
    color: "var(--color-muted)",
  },
  legendItem: { display: "flex", alignItems: "center", gap: 6 },
  legendSwatch: { width: 10, height: 10, borderRadius: "50%", display: "inline-block" },
};
