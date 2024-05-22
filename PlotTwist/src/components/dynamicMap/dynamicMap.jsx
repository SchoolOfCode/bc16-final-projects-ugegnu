import { useState, useEffect } from "react";
import DirectionsData from "../directionsData/directionsData";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "./dynamicMap.css";

export default function DynamicMap({
  routeIsCreated,
  markerCoordinatesArray,
  handleMapClick,
  setRouteIsCreated,
  setMarkerCoordinatesArray,
  loadedRoute,
  geoLocation,
}) {
  // create a new piece of state
  // this state loads the map
  // without the buttons 👀
  // that state is located in directionsData
  // once it's created there, export to dynamic maps

  //could we have a useEffect here the re-renders the map when the geolocation changes?

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <div className="dynamicMap">
          <Map
            //aim to have this show geolocation if proivded (in an object), if not position will be used
            defaultCenter={geoLocation}
            defaultZoom={9}
            mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
            fullscreenControl={false}
            onClick={handleMapClick}
          >
            {markerCoordinatesArray[0] &&
              !routeIsCreated &&
              markerCoordinatesArray.map((marker, index) => {
                return (
                  <Marker
                    key={index}
                    position={marker}
                    draggable={true}
                    onDragEnd={(e) => {
                      const duplicateArray = [...markerCoordinatesArray];
                      duplicateArray[index] = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      };
                      setMarkerCoordinatesArray(duplicateArray);
                    }}
                  />
                );
              })}
          </Map>
        </div>
        <DirectionsData
          markerCoordinatesArray={markerCoordinatesArray}
          routeIsCreated={routeIsCreated}
          setRouteIsCreated={setRouteIsCreated}
          setMarkerCoordinatesArray={setMarkerCoordinatesArray}
          loadedRoute={loadedRoute}
        />
      </APIProvider>
    </>
  );
}
