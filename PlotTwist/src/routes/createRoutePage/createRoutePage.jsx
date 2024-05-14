import DynamicMap from "../../components/dynamicMap/dynamicMap";
import "./createRoutePage.css";
import { useState, useEffect } from "react";
import Header from "../../components/header/headerComponent.jsx";
import arrow from "../../assets/arrow.png";
export default function CreateRoutePage() {
  const [routeIsCreated, setRouteIsCreated] = useState(false);
  // if the route is created, the two buttons; create and reset, will disappear
  const [routeIsReset, setRouteIsReset] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState([]);
  // State for handling the header's styling
  const [openMenu, setOpenMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const handleReset = () => {
    setRouteIsReset(false);
    setMarkerCoordinatesArray([]);
  };

  const handleRouteCreation = () => {
    setRouteIsCreated(true);
  };

  const handleMapClick = (event) => {
    setMarkerCoordinatesArray((prev) => {
      return [
        ...prev,
        { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
      ];
    });
  };

  // Function to handle the opening and closing of the menu - passed to header as props
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  // Function to handle the resizing of the window in order to change the header's styling
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
      <main
        className="mainCreatePage"
        style={
          openMenu && Number(screenWidth) < 1024
            ? { paddingTop: "365px" }
            : { paddingTop: "120px" }
        }
      >
        <section className="mainCreatePage__banner">
          {routeIsReset ? (
            <h1 className="mainCreatePage__heading">
              Welcome to U-PLOT! <br></br> The world&apos;s no.1 route
              optimisation service!
            </h1>
          ) : (
            <h1 className="mainCreatePage__heading">
              The map has been cleared
            </h1>
          )}
          <div className="mainCreatePage__instructionsContainer">
            <h2 className="mainCreatePage__instructionsHeading">
              How do I use the map and create a route?
            </h2>
            {!showInstructions ? (
              <button
                className="mainCreatePage__instructionsButton"
                onClick={handleInstructionsClick}
              >
                <img
                  className="mainCreatePage__arrowDown"
                  src={arrow}
                  alt="Arrow icon"
                />
              </button>
            ) : (
              <button
                className="mainCreatePage__instructionsButton"
                onClick={handleInstructionsClick}
              >
                <img
                  className="mainCreatePage__arrowUp"
                  src={arrow}
                  alt="Arrow icon"
                />
              </button>
            )}
          </div>
        </section>
        {showInstructions && (
          <ol className="mainCreatePage__instructionsList">
            <li className="mainCreatePage__instructionsItem">
              Tap the map to select a starting location
            </li>
            <li className="mainCreatePage__instructionsItem">
              Tap the map to select a finishing location
            </li>
            <li className="mainCreatePage__instructionsItem">
              Tap the map to select up to 20 waypoints in between the start and
              finish
            </li>
            <li className="mainCreatePage__instructionsItem">
              Hit the &apos;Create Route&apos; button to generate an optimised
              route
            </li>
            <li className="mainCreatePage__instructionsItem">
              Give your route a name and save it for convenient access
            </li>
            <li className="mainCreatePage__instructionsItem">
              Hit the &apos;Reset&apos; button to clear the map and start a new
              route
            </li>
          </ol>
        )}
        <DynamicMap
          routeIsCreated={routeIsCreated}
          handleMapClick={handleMapClick}
          markerCoordinatesArray={markerCoordinatesArray}
          setRouteIsCreated={setRouteIsCreated}
          setMarkerCoordinatesArray={setMarkerCoordinatesArray}
        />
        {!routeIsCreated ? (
          <div className="mainCreatePage__buttons">
            <button
              className="mainCreatePage__createButton"
              onClick={handleRouteCreation}
            >
              {" "}
              Create Route{" "}
            </button>
            <button
              className="mainCreatePage__resetButton"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        ) : null}
      </main>
    </>
  );
}
