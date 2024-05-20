import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import "./directionsData.css";
import marker from "../../assets/geo-alt-fill.svg";

import { render } from "react-dom";

import loadingsymbol from "../../assets/tube-spinner.svg";
import logo from "../../assets/FullLogo.png";
import { Link } from "react-router-dom";
import savedRouteConfirmed from "../../assets/savedRouteConfirm.png";
import HomePagecoachlayer from "../../assets/HomePage-coach-layer.png";
export default function DirectionsData({
  markerCoordinatesArray,
  setMarkerCoordinatesArray,
  routeIsCreated,
  setRouteIsCreated,
  loadedRoute,
}) {
  // create a new piece of state
  // this state loads the map
  // without the buttons? 👀 Add an edit and delete button?
  // but with the markers and route name
  // that state is located in retrieved route page
  // once it's created there, export to dynamic maps/ directions data as a prop

  // if state is true,
  // retrive route
  // then render map + markers, edit, de;ete buttons, and the table,
  // Don't render form.

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

  const [startTime, setStartTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const [testArray, setTestArray] = useState([]);

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
        // populateTimingsTable(currentTime); // 1 render behind here ... an extra ctrl + s in vscode loads it onto screen
      });
  }, [
    directionsService,
    directionsRenderer,
    markerCoordinatesArray,
    routeIsCreated,
  ]);

  function addSeconds(date, seconds) {
    date.setSeconds(date.getSeconds() + seconds);
    // setStartTime(new Date(date).toLocaleTimeString());
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // useEffect(() => {
  //   populateTimingsTable(currentTime);
  // });

  function calcTime(time, interval) {
    // const selectedTime = timeInput.value;
    const today = new Date();
    const year = today.getFullYear();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const start = new Date(`${year} ${month} ${date} ${time}`);
    const result = addSeconds(start, interval);
    return result;
  }

  function populateTimingsTable(time) {
    // configure default waiting time here (s)
    const interval = 300;
    let userStartTime = calcTime(time, interval);
    setStartTime(calcTime(time, 0));
    setTestArray([]);
    //aim in here to set start time and for loop to create new array that is rendered instead of directionsResult below
    let arrayToLoop = directionsResult.routes[0].legs;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < arrayToLoop.length; i++) {
      let arrivalTime = calcTime(userStartTime, arrayToLoop[i].duration.value);
      setTestArray((prev) => {
        return [
          ...prev,
          {
            duration: arrayToLoop[i].duration.text,
            arrivalTime: arrivalTime,
            markerOrigin: alphabet[i],
            markerDestination: alphabet[i + 1],
          },
        ];
      });
      // add interval in here
      userStartTime = calcTime(arrivalTime, interval); // 120 is 2 min default
    }
    // calcTotalJourneyTime(arrayToLoop);
  }

  function handleTimeChange(e) {
    populateTimingsTable(e.target.value);
  }

  function handleCurrentTime(e) {
    populateTimingsTable(e.target.value);
    // console.log(e.target.value);
    // setCurrentTime();
    setCurrentTime("23:05");
  }

  function calcTotalJourneyTime(arr) {
    //routes.legs (multi in here) routes[0].legs
    let totalSeconds = 0;
    arr.map((leg) => {
      totalSeconds += leg.duration.value;
    });
    const totalLegs = arr.length;
    totalSeconds += totalLegs * 300; // subtract waiting times
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} Hours ${minutes} Minutes`;
  }

  // console.log(directionsResult);

  return (
    <>
      {routeIsCreated && directionsResult ? (
        <>
          <section className="routeData">
            {currentTime || startTime ? (
              <div className="routeData__timingsContainer">
                <div className="routeData__row">
                  <div className="routeData__markerLetter">
                    <div className="routeData__dottedLineBottom"></div>A
                  </div>
                  <div className="routeData__timings">
                    <img
                      className="routeData__markerGreen"
                      src={marker}
                      alt=""
                    />
                    <div className="routeData__arrivalTime">{startTime}</div>
                  </div>
                </div>
                {testArray.map((element, index) => {
                  return (
                    <div className="routeData__row" key={index}>
                      <div className="routeData__markerLetter">
                        {index + 1 === testArray.length ? (
                          <>
                            {element.markerDestination}
                            <div className="routeData__dottedLineTop"></div>
                          </>
                        ) : (
                          <>
                            <div className="routeData__dottedLineBottom"></div>
                            {element.markerDestination}
                            <div className="routeData__dottedLineTop"></div>
                          </>
                        )}
                      </div>
                      <div className="routeData__timings">
                        <img
                          className={
                            index + 1 === testArray.length
                              ? "routeData__markerRed"
                              : "routeData__markerBlue"
                          }
                          src={marker}
                          alt=""
                        />
                        <div className="routeData__arrivaltime">
                          {element.arrivalTime}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="routeData__row routeData__totalJourneyTime">
                  Total Time:{" "}
                  {calcTotalJourneyTime(directionsResult.routes[0].legs)}{" "}
                </div>
              </div>
            ) : (
              <div className="routeData__timingsContainer">
                <img className="routeData__coach" src={HomePagecoachlayer} />
              </div>
            )}

            {/* </ol> */}
            <div className="routeData__rightSide">
              <h3 className="routeData__departureHeading">
                Select Departure Time
              </h3>
              <div className="routeData__timeWrapper">
                <input
                  className="routeData__inputTimeBox"
                  id="timeInput"
                  type="time"
                  value={currentTime}
                  onChange={handleTimeChange}
                />
                <button
                  className="routeData__currentTimeButton"
                  onClick={handleCurrentTime}
                  value={new Date().toLocaleTimeString()}
                >
                  Current Time
                </button>
              </div>
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
          </section>
          {/* this && will make sure that when isPopUPOPen is true, it will render the div and all the things in it... we can change whether or not is popup is true/false by clicking on the save route or the X button as these both have the function handlePopUp (this is waaay above and basically will change the isPopUp to be true/false (the opposite of what it currently is)...*/}
          {isPopUpOpen && (
            <section onClick={handlePopUp} className="savePopUp">
              {!isLoading && !isSuccess ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="savePopUp__container"
                >
                  <form onSubmit={handleSubmit} className="savePopUp__form">
                    <label className="savePopUp__label" htmlFor="routeName">
                      Route Name
                    </label>
                    <input
                      className="savePopUp__input"
                      type="text"
                      id="routeName"
                      name="routeName"
                      onChange={handleInputChange}
                      value={routeName}
                      placeholder="Type here..."
                      required
                    />
                  </form>
                  <div className="savePopUp__buttonsContainer">
                    <button
                      className="savePopUp__closeButton"
                      onClick={handlePopUp}
                    >
                      &times;
                    </button>
                    <button
                      className="savePopUp__saveButton"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {isLoading && (
                    <div className="savePopUp__loadingContainer">
                      <img src={logo} className="savePopUp__logo" />
                      <img
                        src={loadingsymbol}
                        className="savePopUp__loadingSymbol"
                      />
                    </div>
                  )}
                  {isSuccess && (
                    <div className="savePopUp__successContainer">
                      <button
                        className="savePopUp__closeButton cheekySecondClassNameForCloseButton"
                        onClick={handlePopUp}
                      >
                        &times;
                      </button>
                      <img
                        src={savedRouteConfirmed}
                        className="savePopUp__savedIcon"
                      />
                      <Link to={"/saved-routes"}>
                        <button className="savePopUp__saveRoutesButton">
                          My Saved Routes
                        </button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </section>
          )}
        </>
      ) : null}
    </>
  );
}
