import { useState } from "react";
import DirectionsData from "../directionsData/DirectionsData.1";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "./dynamicMap.css";

export default function DynamicMap({
  routeIsCreated,
  markerCoordinatesArray,
  handleMapClick,
  setRouteIsCreated,
  setMarkerCoordinatesArray,
  loadedRoute,
}) {
  // create a new piece of state
  // this state loads the map
  // without the buttons 👀
  // that state is located in directionsData
  // once it's created there, export to dynamic maps

  const position = { lat: 52.4823, lng: -1.89 };

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <div className="dynamicMap">
          <Map
            defaultCenter={position}
            defaultZoom={9}
            mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
            fullscreenControl={false}
            onClick={handleMapClick}
          >
            {markerCoordinatesArray[0] &&
              !routeIsCreated &&
              markerCoordinatesArray.map((marker, index) => {
                return (
                  <Marker key={index} position={marker} draggable={true} />
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
