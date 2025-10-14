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
  const [loading, setLoading] = useState(true);

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
        setLoading(true);
        const [lng, lat] = userLocation;
        
        // Increased search radius to 5000 meters (5km)
        const query = `
          [out:json];
          (
            node["amenity"="restaurant"](around:5000,${lat},${lng});
            way["amenity"="restaurant"](around:5000,${lat},${lng});
          );
          out center;
        `;
        
        console.log("🔍 Searching for restaurants near:", lat, lng);
        console.log("📋 User preferences:", preferences);
        
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        console.log("📦 Raw OSM data:", data);
        let elements = data.elements || [];
        console.log(`✅ Found ${elements.length} total restaurants`);

        // Process coordinates for ways (buildings)
        elements = elements.map(place => {
          if (place.type === 'way' && place.center) {
            return {
              ...place,
              lat: place.center.lat,
              lon: place.center.lon
            };
          }
          return place;
        });

        // Filter by food preferences - MORE LENIENT MATCHING
        if (preferences.foodTypes && preferences.foodTypes.length > 0) {
          const keywords = preferences.foodTypes.map((p) => p.toLowerCase());
          console.log("🔎 Filtering by keywords:", keywords);
          
          const filtered = elements.filter((place) => {
            const name = place.tags?.name?.toLowerCase() || "";
            const cuisine = place.tags?.cuisine?.toLowerCase() || "";
            const description = place.tags?.description?.toLowerCase() || "";
            
            // More flexible matching
            const matchesKeyword = keywords.some((kw) => {
              // Map user selections to common cuisine types
              const cuisineMap = {
                'burgers': ['burger', 'american', 'fast_food'],
                'pizza': ['pizza', 'italian'],
                'chinese': ['chinese', 'asian'],
                'salads': ['salad', 'healthy', 'vegetarian'],
                'italian': ['italian', 'pizza', 'pasta'],
                'mexican': ['mexican', 'taco', 'burrito'],
                'desserts': ['dessert', 'ice_cream', 'bakery', 'cafe']
              };
              
              const searchTerms = cuisineMap[kw] || [kw];
              
              return searchTerms.some(term => 
                name.includes(term) || 
                cuisine.includes(term) || 
                description.includes(term)
              );
            });
            
            return matchesKeyword;
          });
          
          console.log(`✅ After filtering: ${filtered.length} restaurants match preferences`);
          
          // If no matches found, show all restaurants with a message
          if (filtered.length === 0) {
            console.log("⚠️ No exact matches, showing all restaurants");
            // eslint-disable-next-line no-self-assign
            elements = elements;
          } else {
            elements = filtered;
          }
        }

        setRestaurants(elements);
        setLoading(false);

        // Add markers to map
        if (map.current) {
          elements.forEach((place) => {
            const lat = place.lat || place.center?.lat;
            const lon = place.lon || place.center?.lon;
            
            if (lat && lon) {
              const popupText = `
                <strong>${place.tags?.name || "Unnamed Restaurant"}</strong><br/>
                ${place.tags?.cuisine ? `Cuisine: ${place.tags.cuisine}<br/>` : ''}
                ${place.tags['addr:street'] ? place.tags['addr:street'] + '<br/>' : ''}
              `;
              
              new mapboxgl.Marker({ color: "red" })
                .setLngLat([lon, lat])
                .setPopup(new mapboxgl.Popup().setHTML(popupText))
                .addTo(map.current);
            }
          });
        }
      } catch (err) {
        console.error("❌ Error fetching restaurants:", err);
        setLoading(false);
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
          {loading ? (
            <p>Loading nearby restaurants...</p>
          ) : restaurants.length > 0 ? (
            <>
              <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
                Found {restaurants.length} restaurant(s) near you
                {preferences.foodTypes && preferences.foodTypes.length > 0 && 
                  ` matching: ${preferences.foodTypes.join(', ')}`
                }
              </p>
              {restaurants.map((r) => (
                <div className="individual-result" key={r.id}>
                  <h2>{r.tags?.name || "Unnamed Restaurant"}</h2>
                  <p>
                    {r.tags?.cuisine ? `Cuisine: ${r.tags.cuisine}` : "Cuisine: Not specified"}
                  </p>
                  <p>
                    {r.tags?.['addr:street'] 
                      ? `${r.tags['addr:street']}${r.tags['addr:housenumber'] ? ' ' + r.tags['addr:housenumber'] : ''}`
                      : "Address not available"
                    }
                  </p>
                  {r.tags?.phone && <p>Phone: {r.tags.phone}</p>}
                  {r.tags?.website && (
                    <p>
                      <a href={r.tags.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <p>No restaurants found nearby. Try adjusting your location or preferences.</p>
          )}
        </div>
      </div>
    </div>
  );
}