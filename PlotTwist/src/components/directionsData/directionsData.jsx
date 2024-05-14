import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import "./directionsData.css";
import loadingsymbol from "../../assets/tube-spinner.svg";
import logo from "../../assets/FullLogo.png";
import { Link } from "react-router-dom";

export default function DirectionsData({
  markerCoordinatesArray,
  setMarkerCoordinatesArray,
  routeIsCreated,
  setRouteIsCreated,
}) {
  const map = useMap();

  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] = useState();

  const [directionsRenderer, setDirectionsRenderer] = useState();

  const [directionsResult, setDirectionsResult] = useState();

  const [resetMadeMapClicked, setResetMadeMapClicked] = useState(false);

  const [routeName, setRouteName] = useState("");

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const handlePopUp = () => {
    if (isPopUpOpen) {
      setIsPopUpOpen(false);
    } else {
      setIsPopUpOpen(true);
      setIsSuccess(false);
    }
  };
  const handleInputChange = (event) => {
    setRouteName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const routeData = {
      name: routeName,
      data: markerCoordinatesArray,
    };
    await saveNewRoute(routeData);
  };

  async function saveNewRoute(route) {
    // const body = {
    //   name: "friday",
    //   data: "Test Coordinates",
    // };
    setIsLoading(true);
    console.log(`Adding route ${route.name}...`);
    const response = await fetch(
      "https://final-project-backend-lp20.onrender.com/newRoute",
      // "http://localhost:3000/newRoute",
      {
        method: "POST",
        body: JSON.stringify(route),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    setIsSuccess(true);
  }

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map, resetMadeMapClicked]);

  useEffect(() => {
    if (
      !directionsService ||
      !directionsRenderer ||
      markerCoordinatesArray.length < 2 ||
      !routeIsCreated
    )
      return;

    directionsService
      .route({
        origin: {
          lat: markerCoordinatesArray[0]?.lat,
          lng: markerCoordinatesArray[0]?.lng,
        },
        destination: {
          lat: markerCoordinatesArray[1]?.lat,
          lng: markerCoordinatesArray[1]?.lng,
        },
        waypoints: markerCoordinatesArray[2]
          ? markerCoordinatesArray.slice(2).map((marker) => ({
              location: { lat: marker.lat, lng: marker.lng },
              stopover: true,
            }))
          : [],
        travelMode: "DRIVING",
        optimizeWaypoints: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        //setDirectionsResult(response);
        setDirectionsResult(directionsRenderer.getDirections());
      });
  }, [
    directionsService,
    directionsRenderer,
    markerCoordinatesArray,
    routeIsCreated,
  ]);

  // console.log(directionsResult);

  return (
    <>
      {routeIsCreated && directionsResult ? (
        <>
          {/* this && will make sure that when isPopUPOPen is true, it will render the div and all the things in it... we can change whether or not is popup is true/false by clicking on the save route or the X button as these both have the function handlePopUp (this is waaay above and basically will change the isPopUp to be true/false (the opposite of what it currently is)...*/}
          {isPopUpOpen && (
            <div className="routeDate__popupContainer">
              <div className="routeData__popup">
                <button
                  className="routeData__popup__closingButton"
                  onClick={handlePopUp}
                >
                  X
                </button>
                <form className="routeData__form" onSubmit={handleSubmit}>
                  <label
                    className="routeData__label"
                    htmlFor="routeName"
                  ></label>
                  <input
                    className="routeData__nameInput"
                    type="text"
                    id="routeName"
                    name="routeName"
                    onChange={handleInputChange}
                    value={routeName}
                    placeholder="Enter route name..."
                    required
                  />
                  <button className="routeData__saveRouteButton">Save</button>
                </form>
                {isSuccess && (
                  <div>
                    <h2>Saved Tick</h2>
                    <Link to={"/create-route"}>
                      <button className="routeData__navButtons">
                        Plot New Route
                      </button>
                    </Link>
                    <Link to={"/saved-routes"}>
                      <button className="routeData__navButtons">
                        My Saved Routes
                      </button>
                    </Link>
                  </div>
                )}
                {isLoading && (
                  <div className="routeDate__loadingDiv">
                    <img src={logo} className="routeData__logo" />
                    <img
                      src={loadingsymbol}
                      className="routeData__loadingSymbol"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <section className="routeData">
            <div className="routeData__information">
              <ol className="routeData__list">
                {directionsResult.routes[0].legs.map((element, index) => {
                  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  return (
                    <li className="routeData__listItem" key={index}>
                      {`Marker ${alphabet[index]} => Marker ${
                        alphabet[index + 1]
                      }: `}
                      {element.duration?.text}
                    </li>
                  );
                })}
              </ol>
              <div className="routeData__buttons">
                <button
                  onClick={handlePopUp}
                  className="routeData__saveRouteButton"
                >
                  Save Route
                </button>
                <button
                  className="routeData__resetRouteButton"
                  onClick={() => {
                    setRouteIsCreated(!routeIsCreated);
                    setMarkerCoordinatesArray([]);
                    setResetMadeMapClicked(!resetMadeMapClicked);
                    directionsRenderer.setMap(null);
                    //setDirectionsResult(null);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
    //   <div className="directions">
    //     <h1>Directions</h1>
    //     {directionsResult && (
    //       <div>
    //         <h2>{directionsResult.routes[0].summary}</h2>
    //         <p>
    //           {directionsResult.routes[0].legs[0].start_address.split(",")[0]} to{" "}
    //           {directionsResult.routes[0].legs[0].end_address.split(",")[0]}
    //         </p>
    //         <p>Distance: {directionsResult.routes[0].legs[0].distance?.text}</p>
    //         <p>Duration: {directionsResult.routes[0].legs[0].duration?.text}</p>
    //         <h2>Detailed Steps</h2>
    //         <ol>
    //           {directionsResult.routes[0].legs[0].steps.map((step, index) => (
    //             <li key={index}>{step.instructions.replaceAll("<b>", "")}</li>
    //           ))}
    //         </ol>
    //       </div>
    //     )}
    //   </div>
  );
}
