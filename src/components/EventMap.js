import React, { useState, useRef, useCallback } from "react";
import ReactMapGL, { Marker, GeolocateControl, Popup } from "react-map-gl";
import { Point } from "mapbox-gl";
import { useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";



function EventMap() {
  // Mapbox key
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZGFhbmtsZWluZW4iLCJhIjoiY2t4MzFwMTJxMGo2bTJ1bzFncjV6YmJ6ayJ9.FY0BF_wgag5wFw-2dWSLGQ";

  // groote van de kaart plus op welke coördinaten hij moet openent voor nu Zurich.
  const [viewport, setViewport] = useState({
    latitude: 47.376888,
    longitude: 8.541694,
    width: "100vw",
    height: "92vh",
    zoom: 5,
  });

  const [eventMarker, setEventMarker] = useState([]);

  // Haalt data op uit de firebase database
  useEffect(() => {
    const data = collection(db, "Events");
    const unsub = onSnapshot(data, (querySnapshot) => {
      let eventMarkerArray = [];
      querySnapshot.forEach((doc) => {
        eventMarkerArray.push({ ...doc.data(), id: doc.id });
      });
      setEventMarker(eventMarkerArray);
    });
    return () => unsub();
  }, []);

  // zet de gebruiker locatie knop rechts boven
  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  // toggle of de popup zichtbaar is of niet
  const [popup, setPopup] = useState(null);

  //geocoooder als locatie in is gevuld dat hij naar de locatie toe gaat
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  return (
    <div id="map">
      {/* Map component */}
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapStyle="mapbox://styles/daankleinen/ckx32f1al1oi614tecpwhoqek"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {/* Knop voor de gebruiker locatie */}
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={false}
        />
        {/* Mapt alle markers die in de database staan */}
        {eventMarker.map((eventMarker) => {
          return (
            <div>
              <Marker
                key={eventMarker.id}
                latitude={eventMarker.lat}
                longitude={eventMarker.lng}
                type={Point}
              >
                <div className="marker">
                  <img
                    src={eventMarker.marker}
                    onClick={(e) => {
                      e.preventDefault();
                      setPopup(eventMarker);
                    }}
                  />
                </div>
              </Marker>
            </div>
          );
        })}
        
        {/* Popup */}
        {popup ? (
          <Popup
            latitude={popup.lat}
            longitude={popup.lng}
            onClose={() => {
              setPopup(null);
            }}
          >
            <div className="popup">
              <img className="popupImg" src={popup.img} alt="" />
              <p>{popup.name}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default EventMap;
