import React, { useState, useRef, useCallback } from "react";
import ReactMapGL, { GeolocateControl, } from "react-map-gl";
import { db } from "../firebase-config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-config";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import userEvent from "@testing-library/user-event";
import nextId from "react-id-generator";



const CreateEvent = () => {
    const MAPBOX_TOKEN ="pk.eyJ1IjoiZGFhbmtsZWluZW4iLCJhIjoiY2t4MzFwMTJxMGo2bTJ1bzFncjV6YmJ6ayJ9.FY0BF_wgag5wFw-2dWSLGQ";

    const [viewport, setViewport] = useState({
        latitude: 51,
        longitude: 6,
        width: "100%",
        height: "10vh",
        zoom: 5,
      });

      const geolocateControlStyle = {
        right: 10,
        top: 10,
      };

      const mapRef = useRef();
      const geocoderContainerRef = useRef();
      const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
      );
    
      const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
    
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides,
          });
        },
        [handleViewportChange]
      );

       //data voor nieuwe marker
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [website, setWebsite] = useState("")
  const [markerIcon, setMarkerIcon] = useState("");
  const Rand = nextId();

  const docRef = doc(db, "Events", Rand);

  // voeg marker toe aan database
  async function add() {
    await setDoc(docRef, {
      lat: lat,
      lng: lng,
      name: name,
      decription: description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      website: website,
      img: imageUrl,
      marker: markerIcon,
    });
  }

  //pakt de geocoder als var
  var input = document.getElementsByClassName("mapboxgl-ctrl-geocoder--input");

  function getMoviesFromApiAsync(place) {
    return fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        place +
        ".json?access_token=pk.eyJ1IjoiZGFhbmtsZWluZW4iLCJhIjoiY2t4MzFwMTJxMGo2bTJ1bzFncjV6YmJ6ayJ9.FY0BF_wgag5wFw-2dWSLGQ"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setLat(responseJson.features[0].center[1]);
        setLng(responseJson.features[0].center[0]);
      })
      .then(console.log(lng, place))
      .catch((error) => {
        console.error(error);
      });
  }
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `Events/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

    return (
        <div id="createEventWrapper">
        <h1>Create an event</h1>
        
          <label for="imgButton">
          <div className="uploadImage"> </div>
          </label>
          <input id="imgButton" type="file" onChange={onChange} />
          <p id="progress">Upload : {progress}%</p>
       

          <input type="text" id="name" placeholder="Event name" value={name} onChange={(e) => setName(e.target.value)} />

          <input type="text" id="description" placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} />

          <p>start: <input type="datetime-local" id="startDate" name="start" value={startDate} onChange={(e) => {setStartDate(e.target.value)}} /></p>
          <p>end: <input type="datetime-local" id="endDate" name="end" value={endDate} onChange={(e) => {setEndDate(e.target.value)}} /></p>
          <input type="text" id="website" placeholder="Website (optional)" value={website} onChange={(e) => setWebsite(e.target.value)} />

          <div
            ref={geocoderContainerRef}
            style={{
            height: "7.5vh",
            }
          } />
          <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          reverseGeocode={true}
          marker={true}
          containerRef={geocoderContainerRef}
        />

          <ReactMapGL
            {...viewport}
            ref={mapRef}
            mapStyle="mapbox://styles/daankleinen/ckx32f1al1oi614tecpwhoqek"
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={(viewport) => {
            setViewport(viewport);
          }}>
         

            <GeolocateControl
              style={geolocateControlStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showUserHeading={true}
              showAccuracyCircle={false}
            />

            
          </ReactMapGL>

          <h3 id="eventTypeTitle">Event Type</h3>
          <div id="eventTypeWrapper">
            <div className="eventType" id="optionMeet">
              <img src="https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FEventIcon%2FmeetIcon.svg?alt=media&token=bbb5f1b3-0e11-4a92-b597-936f5f0f3d14" alt="" onClick={() =>{setMarkerIcon("https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FMarker%2FmeetMarker.svg?alt=media&token=39640b0b-8419-4de0-aa45-5c4130fe236b")}} />
              <p>Meet</p>
            </div>

            <div className="eventType" id="optionCruise">
              <img src="https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FEventIcon%2FcruiseIcon.svg?alt=media&token=1f6726f9-c1d1-46e2-a5c8-f99e488eaa92" alt="" onClick={() => {setMarkerIcon("https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FMarker%2FcruiseMarker.svg?alt=media&token=6d49e9e7-0871-4618-9160-ae7c6758b03b")}} />
              <p>Cruise</p>
            </div>

            <div className="eventType" id="OptionTrack">
              <img src="https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FEventIcon%2FtrackIcon.svg?alt=media&token=e977a9de-8da6-4cfe-9ac7-1468578cb697" alt="" onClick={() => {setMarkerIcon("https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FMarker%2FtrackMarker.svg?alt=media&token=228cb35e-913e-4e12-8191-7457a8c040c2")}} />
              <p>Track</p>
            </div>

            <div className="eventType" id="optionCarShow">
              <img src="https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FEventIcon%2FcarShowIcon.svg?alt=media&token=452d10eb-c103-45ba-9063-a0def737e91f" alt="" onClick={() => {setMarkerIcon("https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FMarker%2FcarShowMarker.svg?alt=media&token=9b85f735-4d94-4257-9259-8f247218fe70")}} />
              <p>Car show</p>
            </div>

            <div className="eventType" id="optionCarsAndCoffee">
              <img src="https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FEventIcon%2FCarsAndCoffeeIcon.svg?alt=media&token=f8c48ed2-f749-472d-9ab5-6fac769c4346" alt="" onClick={() => {setMarkerIcon("https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FMarker%2FcarsAndCoffeeMarker.svg?alt=media&token=5e2bbaa2-0695-409c-a81f-5952147611a5")}} />
              <p>Cars & coffee</p>
            </div>

            <div className="eventType" id="optionOthers">
              <img src="https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FEventIcon%2FotherIcon.svg?alt=media&token=7c4483b4-338e-4b0c-9176-e92191e1b4a6" alt="" onClick={() => {setMarkerIcon("https://firebasestorage.googleapis.com/v0/b/mappoc-e3a48.appspot.com/o/EventType%2FMarker%2FotherMarker.svg?alt=media&token=c3ea92c0-f4f2-42d3-9f19-654d382337bf")}} />
              <p>Other</p>
            </div>
          </div>

          <button
            id="validate"
            onClick={() => {
              getMoviesFromApiAsync(input[0].value);
            }}
          >
            Validate
          </button>
          <button
            id="submit"
            onClick={add}
            disabled={progress !== 100 ? true : false}
          >
            {" "}
            Sumbit
          </button>
            
        </div>
    )
}

export default CreateEvent
