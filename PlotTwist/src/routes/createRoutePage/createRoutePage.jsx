import DynamicMap from "../../components/dynamicMap/dynamicMap";
import "./createRoutePage.css";
import { useState, useEffect } from "react";
import Header from "../../components/header/headerComponent.jsx";
import loadingsymbol from "../../assets/tube-spinner.svg";
import logo from "../../assets/FullLogo.png";

export default function CreateRoutePage() {
  const [routeIsCreated, setRouteIsCreated] = useState(false);
  // if the route is created, the two buttons; create and reset, will disappear
  const [routeIsReset, setRouteIsReset] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState([]);
  // State for handling the header's styling
  const [openMenu, setOpenMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  //geolocation state
  const [geoLocation, setGeolocation] = useState();
  const handleInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const handleReset = () => {
    if (markerCoordinatesArray.length < 2) {
      alert("The map is already clear");
      setRouteIsReset(true);
      return;
    }
    setRouteIsReset(false);
    setMarkerCoordinatesArray([]);
  };

  const handleRouteCreation = () => {
    if (markerCoordinatesArray.length >= 2) {
      setRouteIsCreated(true);
    } else {
      alert("Please select at least two locations to create a route");
    }
  };

  const handleMapClick = (event) => {
    if (routeIsCreated) {
      return;
    } else if (markerCoordinatesArray.length >= 22) {
      return;
    } else {
      setMarkerCoordinatesArray((prev) => {
        return [
          ...prev,
          { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
        ];
      });
    }
  };

  // Function to handle the opening and closing of the menu - passed to header as props
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  // Function to handle the resizing of the window in order to change the header's styling
  //in this function we have added the geolocation - error if people decline and success if someone says yes
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setGeolocation({ lat: 52.4823, lng: -1.89 });
    }
    function success(pos) {
      const crd = pos.coords;
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      setGeolocation({ lat: crd.latitude, lng: crd.longitude });
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   console.log(geoLocation);
  // }, [geoLocation]);

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
            <h1 className="mainCreatePage__heading">Welcome to U-PLOT</h1>
          ) : (
            <h1 className="mainCreatePage__heading">
              The map has been cleared
            </h1>
          )}
          {!showInstructions ? (
            <button
              className="mainCreatePage__instructionsButton"
              onClick={handleInstructionsClick}
            >
              ?
            </button>
          ) : (
            <button
              className="mainCreatePage__instructionsButton"
              onClick={handleInstructionsClick}
            >
              &times;
            </button>
          )}
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
        {/* //this map needs to rerender whenever the geoLocation changes... */}
        {!geoLocation && (
          <div className="mainCreatePage__loading">
            <h2>Allow or block your location</h2>
            <img className="uplot-logo" src={logo}></img>
            <img className="loading-gif" src={loadingsymbol}></img>
          </div>
        )}
        {/* this renders the map when geolocation is provided */}
        {geoLocation && (
          <DynamicMap
            routeIsCreated={routeIsCreated}
            handleMapClick={handleMapClick}
            markerCoordinatesArray={markerCoordinatesArray}
            setRouteIsCreated={setRouteIsCreated}
            setMarkerCoordinatesArray={setMarkerCoordinatesArray}
            geoLocation={geoLocation}
          />
        )}

        {!routeIsCreated ? (
          <div className="mainCreatePage__buttons">
            <button
              className="mainCreatePage__createButton"
              onClick={handleRouteCreation}
            >
              Create Route
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
