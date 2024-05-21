import DynamicMap from "../../components/dynamicMap/dynamicMap";
import { useState, useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import backArrow from "../../assets/backArrow.png";
import whiteDeleteIcon from "../../assets/whiteDeleteIcon.png";
import "./retrievedRoutePage.css";

export default function RetrievedRoutePage({
  handleRetrieve,
  selectedRoute,
  setRetrieved,
  retrieved,
  getAllRoutes,
  test
}) {
  return <h1>Retrieved Route Page: {test}</h1>;
  // const [routeIsCreated, setRouteIsCreated] = useState(true);
  // const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState(
  //   selectedRoute.payload.route_data
  // );

  // const routesLibrary = useMapsLibrary("routes");

  // const [loadedRoute, setLoadedRoute] = useState(true);

  // // when selectedRoute.payload changes useState to true
  // // if selectedRoute is true, then routeIsCreated = true

  // console.log(selectedRoute);
  // console.log(selectedRoute.payload.id);

  // const handleDelete = async () => {
  //   const id = selectedRoute.payload.id;
  //   const response = await fetch(
  //     `https://final-project-backend-lp20.onrender.com/delete/${id}`,
  //     { method: "DELETE" }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   // here, we can change retrieved to false
  //   setRetrieved(false);
  //   getAllRoutes();
  // };

  // const handleMapClick = (event) => {
  //   setMarkerCoordinatesArray((prev) => {
  //     return [
  //       ...prev,
  //       {
  //         lat: selectedRoute.payload.route_data[0].lat,
  //         lng: selectedRoute.payload.route_data[0].lng,
  //       },
  //     ];
  //   });
  // };

  // return (
  //   <main className="retrievedRoute">
  //     <div className="retrievedRoute__titleAndButtons">
  //       <button className="retrievedRoute__backButton" onClick={handleRetrieve}><img className="retrievedRoute__backArrowImage" src={backArrow} alt="Back Arrow"/></button>
  //       <h1 className="retrievedRoute__routeTitle">{selectedRoute.payload.route_name}</h1>
  //       <button
  //         onClick={handleDelete}
  //         className="retrievedRoute__deleteButton"
  //       ><img
  //       src={whiteDeleteIcon}
  //       className="savedRoutes__deleteIcon"
  //     /></button>
  //     </div>
  //     <DynamicMap
  //       routeIsCreated={routeIsCreated}
  //       markerCoordinatesArray={markerCoordinatesArray}
  //       setRouteIsCreated={setRouteIsCreated}
  //       setMarkerCoordinatesArray={setMarkerCoordinatesArray}
  //       loadedRoute={loadedRoute}
  //     />
  //   </main>
  // );
}
