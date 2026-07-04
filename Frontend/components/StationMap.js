import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Leaflet's default marker icons reference image files that don't resolve
// correctly under Next.js bundling — rebuild the icon URLs explicitly.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const STATUS_COLORS = {
  OPERATIONAL: "#0B7A4B",
  UNKNOWN: "#A38408",
  DOWN: "#C0392B",
  REMOVED: "#888888",
};

function stationIcon(status) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.UNKNOWN;
  return L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function userIcon() {
  return L.divIcon({
    className: "",
    html: `<div class="pulse-dot"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function Recenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center]);
  return null;
}

export default function StationMap({ userLocation, stations, onReport }) {
  const [center, setCenter] = useState(userLocation || { lat: 6.5244, lng: 3.3792 });

  useEffect(() => {
    if (userLocation) setCenter(userLocation);
  }, [userLocation]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={12}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter center={[center.lat, center.lng]} />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon()}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={stationIcon(station.status)}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{station.name}</strong>
              <div style={{ fontSize: 12, color: "#6B7570", margin: "4px 0" }}>
                {station.type.replace(/_/g, " ")} · {station.status}
                {station.distanceKm != null && ` · ${station.distanceKm.toFixed(1)} km away`}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>Still working?</div>
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <button
                  onClick={() => onReport(station.id, true)}
                  style={{ color: "#0B7A4B", fontWeight: 700, background: "none", border: "none", padding: 0 }}
                >
                  Yes
                </button>
                <button
                  onClick={() => onReport(station.id, false)}
                  style={{ color: "#C0392B", fontWeight: 700, background: "none", border: "none", padding: 0 }}
                >
                  No
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
