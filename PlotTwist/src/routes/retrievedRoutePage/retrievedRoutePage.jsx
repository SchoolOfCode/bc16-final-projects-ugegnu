import DynamicMap from "../../components/dynamicMap/dynamicMap";
import { useState, useEffect } from "react";

export default function RetrievedRoutePage({ handleRetrieve, selectedRoute }) {
  const [routeIsCreated, setRouteIsCreated] = useState(false);
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState(
    selectedRoute.payload.route_data
  );

  // when selectedRoute.payload changes useState to true
  // if selectedRoute is true, then routeIsCreated = true
  //

  // if (selectedRoute.payload.route_data) {
  //   return setRouteIsCreated(true);
  // }

  useEffect(() => {
    if (selectedRoute.payload.route_data) {
      setRouteIsCreated(true);
    }
  }, []);

  const handleMapClick = (event) => {
    setMarkerCoordinatesArray((prev) => {
      return [
        ...prev,
        { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
      ];
    });
  };

  console.log(selectedRoute);
  return (
    <div>
      <h1>Retrieved Route Page</h1>

      <DynamicMap
        routeIsCreated={routeIsCreated}
        handleMapClick={handleMapClick}
        markerCoordinatesArray={markerCoordinatesArray}
        setRouteIsCreated={setRouteIsCreated}
        setMarkerCoordinatesArray={setMarkerCoordinatesArray}
      />

      <h1>route name</h1>
      <h2>{selectedRoute.payload.route_name}</h2>
      <h2>Marker1 lat{selectedRoute.payload.route_data[0].lat}</h2>
      <h2>Marker1 lng{selectedRoute.payload.route_data[0].lng}</h2>
      <button onClick={handleRetrieve}>Go back</button>
    </div>
  );
}
