import DynamicMap from "../../components/dynamicMap/dynamicMap";
import { useState, useEffect } from "react";

export default function RetrievedRoutePage({ handleRetrieve, selectedRoute }) {
  const [routeIsCreated, setRouteIsCreated] = useState(true);
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState(
    selectedRoute.payload.route_data
  );

  const [loadedRoute, setLoadedRoute] = useState(true);

  // when selectedRoute.payload changes useState to true
  // if selectedRoute is true, then routeIsCreated = true

  console.log(selectedRoute);
  return (
    <div>
      <h1>Retrieved Route Page</h1>

      <DynamicMap
        routeIsCreated={routeIsCreated}
        markerCoordinatesArray={markerCoordinatesArray}
        setRouteIsCreated={setRouteIsCreated}
        setMarkerCoordinatesArray={setMarkerCoordinatesArray}
        loadedRoute={loadedRoute}
      />

      <h1>route name</h1>
      <h2>{selectedRoute.payload.route_name}</h2>
      <h2>Marker1 lat{selectedRoute.payload.route_data[0].lat}</h2>
      <h2>Marker1 lng{selectedRoute.payload.route_data[0].lng}</h2>
      <button onClick={handleRetrieve}>Go back</button>
    </div>
  );
}
