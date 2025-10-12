import React, { useEffect, useRef, useState } from "react";
import "./Results.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2ExanUiLCJhIjoiY21nNDg5OWxyMGFxMjJucTAyaGx3bjhvYSJ9.Nm8aulSVc2qTKje7B7dHag";

export default function Results({ preferences }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // 1️⃣ Get user location using the browser Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      },
      (error) => {
        console.error("Error getting location:", error);
        // fallback location (NYC)
        setUserLocation([-73.9855, 40.758]);
      }
    );
  }, []);

  // 2️⃣ Initialize the map once user location is available
  useEffect(() => {
    if (!userLocation || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 13,
    });

    // add user marker
    new mapboxgl.Marker({ color: "blue" })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setText("You are here"))
      .addTo(map.current);
  }, [userLocation]);

  // 3️⃣ Fetch nearby restaurant data based on preferences
  useEffect(() => {
    if (!userLocation) return;

    const fetchRestaurants = async () => {
      try {
        // Example Mapbox Search API call
        const cuisine = preferences?.cuisine || "restaurant";
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cuisine}.json?proximity=${userLocation[0]},${userLocation[1]}&types=poi&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        setRestaurants(data.features || []);

        // plot markers
        data.features.forEach((place) => {
          new mapboxgl.Marker({ color: "red" })
            .setLngLat(place.geometry.coordinates)
            .setPopup(new mapboxgl.Popup().setText(place.text))
            .addTo(map.current);
        });
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };

    fetchRestaurants();
  }, [userLocation, preferences]);

  // 4️⃣ Render map and results
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
                <h2>{r.text}</h2>
                <p>{r.place_name}</p>
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