import React, { useEffect, useRef } from "react";
import "./Results.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2ExanUiLCJhIjoiY21nNDg5OWxyMGFxMjJucTAyaGx3bjhvYSJ9.Nm8aulSVc2qTKje7B7dHag";

export default function Results() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // only initialize once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // you can change style
      center: [-73.9855, 40.758], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });
  }, []);

  return (
    <div className="results">
      <h1 className="results-title">Restaurants</h1>
      <div className="results-section">
        <div className="maps">
          <div
            ref={mapContainer}
            style={{ width: "100%", height: "600px", borderRadius: "10px" }}
          ></div>
        </div>
        <div className="container">
          <div className="individual-result">
            <h2>Resturant title</h2>
            <p>Details about restaurant</p>
          </div>
          <div className="individual-result">
            <h2>Resturant title</h2>
            <p>Details about restaurant</p>
          </div>
          <div className="individual-result">
            <h2>Resturant title</h2>
            <p>Details about restaurant</p>
          </div>
          <div className="individual-result">
            <h2>Resturant title</h2>
            <p>Details about restaurant</p>
          </div>
          <div className="individual-result">
            <h2>Resturant title</h2>
            <p>Details about restaurant</p>
          </div>
        </div>
      </div>
    </div>
  );
}
