// Point this at your Railway backend once deployed, e.g.
// "https://api.yourapp.com"
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error ? JSON.stringify(errBody.error) : `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  getStationsNearby: (lat, lng, radiusKm = 25) =>
    request(`/api/stations?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`),

  getStation: (id) => request(`/api/stations/${id}`),

  reportStation: (id, working, note) =>
    request(`/api/stations/${id}/report`, {
      method: "POST",
      body: JSON.stringify({ working, note }),
    }),

  getShopsNearby: (lat, lng, radiusKm = 25) =>
    request(`/api/shops?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`),

  getShop: (id) => request(`/api/shops/${id}`),

  addReview: (shopId, rating, comment, authorName) =>
    request(`/api/shops/${shopId}/reviews`, {
      method: "POST",
      body: JSON.stringify({ rating, comment, authorName }),
    }),

  getTips: (category) => request(`/api/tips${category ? `?category=${category}` : ""}`),

  submit: (type, payload, contactInfo) =>
    request(`/api/submissions`, {
      method: "POST",
      body: JSON.stringify({ type, payload, contactInfo }),
    }),
};
