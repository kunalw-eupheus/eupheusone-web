import React from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import { useState } from "react";
import { useLayoutEffect } from "react";

function MyComponent({ sidebarCollapsed }) {
  const [currentLocation, setCurrentLocation] = useState();
  const [path, setPath] = useState([]);
  useLayoutEffect(() => {
    var successHandler = function (position) {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setPath([
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      ]);
    };

    var errorHandler = function (errorObj) {
      alert(errorObj.code + ": " + errorObj.message);

      alert("something wrong take this lat " + 26.0546106);
      alert("something wrong take this lng " + -98.3939791);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      maximumAge: 10000,
    });
  }, []);
  console.log(currentLocation);
  const containerStyle = {
    width: `${sidebarCollapsed ? "100%" : "81vw"}`,
    height: "100%",
  };

  const center = currentLocation;

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ],
    zIndex: 1,
  };

  const onLoad = (polyline) => {
    console.log("polyline: ", polyline);
  };

  const addLatLng = (event) => {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    setPath([...path, { lat, lng }]);
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={addLatLng}
      >
        <Polyline onLoad={onLoad} path={path} options={options} />
        {path
          ? path.map((path, index) => {
              return <Marker position={path} key={index} />;
            })
          : null}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
