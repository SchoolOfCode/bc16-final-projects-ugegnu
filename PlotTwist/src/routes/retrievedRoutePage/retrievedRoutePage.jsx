import DynamicMap from "../../components/dynamicMap/dynamicMap";
import { useState, useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

export default function RetrievedRoutePage({
  handleRetrieve,
  selectedRoute,
  setRetrieved,
  retrieved,
  getAllRoutes,
}) {
  const [routeIsCreated, setRouteIsCreated] = useState(true);
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState(
    selectedRoute.payload.route_data
  );

  const routesLibrary = useMapsLibrary("routes");

  const [loadedRoute, setLoadedRoute] = useState(true);

  // when selectedRoute.payload changes useState to true
  // if selectedRoute is true, then routeIsCreated = true

  console.log(selectedRoute);
  console.log(selectedRoute.payload.id);

  const handleDelete = async () => {
    const id = selectedRoute.payload.id;
    const response = await fetch(
      `https://final-project-backend-lp20.onrender.com/delete/${id}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    console.log(data);
    // here, we can change retrieved to false
    setRetrieved(false);
    getAllRoutes();
  };

  const handleMapClick = (event) => {
    setMarkerCoordinatesArray((prev) => {
      return [
        ...prev,
        {
          lat: selectedRoute.payload.route_data[0].lat,
          lng: selectedRoute.payload.route_data[0].lng,
        },
      ];
    });
  };

  return (
    <div>
      <h1>{selectedRoute.payload.route_name}</h1>

      <DynamicMap
        routeIsCreated={routeIsCreated}
        markerCoordinatesArray={markerCoordinatesArray}
        setRouteIsCreated={setRouteIsCreated}
        setMarkerCoordinatesArray={setMarkerCoordinatesArray}
        loadedRoute={loadedRoute}
      />

      <div className="routeData__buttonContainer">
        <button onClick={handleMapClick} className="routeData__editRouteButton">
          Edit 🚧 WIP 🚧
        </button>
        <br></br>
        <button onClick={handleDelete} className="routeData__deleteRouteButton">
          Delete 🚧 WIP 🚧
        </button>
      </div>

      <div>
        <button onClick={handleRetrieve}>Go back</button>
      </div>

      {/* <h1>route name</h1>
      <h2>{selectedRoute.payload.route_name}</h2>
      <h2>Marker1 lat{selectedRoute.payload.route_data[0].lat}</h2>
      <h2>Marker1 lng{selectedRoute.payload.route_data[0].lng}</h2>
     
      */}
    </div>
  );
}
