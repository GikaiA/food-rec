import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "./Results.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2ExanUiLCJhIjoiY21nNDg5OWxyMGFxMjJucTAyaGx3bjhvYSJ9.Nm8aulSVc2qTKje7B7dHag";

export default function Results() {
  const location = useLocation();
  const preferences = location.state?.preferences || {};

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // 1️⃣ Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        setUserLocation([-73.9855, 40.758]); // fallback: NYC
      }
    );
  }, []);

  // 2️⃣ Initialize Mapbox
  useEffect(() => {
    if (!userLocation || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 13,
    });

    new mapboxgl.Marker({ color: "blue" })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setText("You are here"))
      .addTo(map.current);
  }, [userLocation]);

  // 3️⃣ Fetch restaurants from OpenStreetMap (OSM) + filter by preferences
  useEffect(() => {
    if (!userLocation) return;

    const fetchRestaurants = async () => {
      try {
        const [lng, lat] = userLocation;
        const query = `
          [out:json];
          node["amenity"="restaurant"](around:2000,${lat},${lng});
          out;
        `;
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        let elements = data.elements || [];

        // Filter by food preferences
        if (preferences.foodTypes?.length > 0) {
          const keywords = preferences.foodTypes.map((p) => p.toLowerCase());
          elements = elements.filter((place) => {
            const name = place.tags.name?.toLowerCase() || "";
            const cuisine = place.tags.cuisine?.toLowerCase() || "";
            return keywords.some((kw) => name.includes(kw) || cuisine.includes(kw));
          });
        }

        setRestaurants(elements);

        elements.forEach((place) => {
          if (place.lat && place.lon) {
            new mapboxgl.Marker({ color: "red" })
              .setLngLat([place.lon, place.lat])
              .setPopup(
                new mapboxgl.Popup().setText(place.tags.name || "Unnamed Restaurant")
              )
              .addTo(map.current);
          }
        });
      } catch (err) {
        console.error("❌ Error fetching restaurants:", err);
      }
    };

    fetchRestaurants();
  }, [userLocation, preferences]);

  // 4️⃣ Render
  return (
    <div className="results">
      <h1 className="results-title">Restaurants Near You</h1>
      <div className="results-section">
        <div className="maps">
          <div
            ref={mapContainer}
            style={{ width: "100%", height: "600px", borderRadius: "10px" }}
          ></div>
        </div>
        <div className="container">
          {restaurants.length > 0 ? (
            restaurants.map((r) => (
              <div className="individual-result" key={r.id}>
                <h2>{r.tags.name || "Unnamed Restaurant"}</h2>
                <p>
                  {r.tags.cuisine ? `Cuisine: ${r.tags.cuisine}` : "Cuisine: Not specified"}
                </p>
                <p>{r.tags.addr_full || "Address not available"}</p>
              </div>
            ))
          ) : (
            <p>Loading nearby restaurants...</p>
          )}
        </div>
      </div>
    </div>
  );
}
