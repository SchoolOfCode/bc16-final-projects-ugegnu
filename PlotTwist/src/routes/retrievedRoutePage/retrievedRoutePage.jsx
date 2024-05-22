import DynamicMap from "../../components/dynamicMap/dynamicMap";
import { useState, useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import backArrow from "../../assets/backArrow.png";
import whiteDeleteIcon from "../../assets/whiteDeleteIcon.png";
import "./retrievedRoutePage.css";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/header/headerComponent";

export default function RetrievedRoutePage({
  handleRetrieve,
  selectedRoute,
  setRetrieved,
  retrieved,
  getAllRoutes,
  test,
}) {
  const location = useLocation();

  // return (
  //   <>
  //     <h1>Retrieved Route Page:</h1>
  //     <h2>ID: {location.state.id}</h2>
  //     <h2>Name: {location.state.route_name}</h2>
  //     <h2>Lat: {location.state.route_data[0].lat}</h2>
  //     <h2>Lng: {location.state.route_data[0].lng}</h2>
  //   </>
  // );

  const [routeIsCreated, setRouteIsCreated] = useState(true);
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState(
    location.state.route_data
  );

  const [isDeletePopup, setDeletePopup] = useState(false);

  const routesLibrary = useMapsLibrary("routes");

  const [loadedRoute, setLoadedRoute] = useState(true);

  // State for handling the header's styling
  const [openMenu, setOpenMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // when selectedRoute.payload changes useState to true
  // if selectedRoute is true, then routeIsCreated = true

  const handleDelete = async () => {
    const id = location.state.id;
    const response = await fetch(
      `https://final-project-backend-lp20.onrender.com/delete/${id}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    console.log(data);
    // here, we can change retrieved to false
    // setRetrieved(false);
    // getAllRoutes();
  };

  const handleMapClick = (event) => {
    setMarkerCoordinatesArray((prev) => {
      return [
        ...prev,
        {
          lat: location.state.route_data[0].lat,
          lng: location.state.route_data[0].lng,
        },
      ];
    });
  };

  const deletePopup = () => {
    // setDeleteSuccess(false);
    // setDeleteLoading(false);
    setDeletePopup(!isDeletePopup);
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

  const resizePadding = () => {
    if (openMenu && (Number(screenWidth) < 1024 && Number(screenWidth) > 500)) {
      return { paddingTop: "365px" };
    } else if(openMenu && Number(screenWidth) < 500) {
      return { paddingTop: "250px"};
    } else {
      return { paddingTop: "120px" };
    }
  }

  return (
    <>
      <Header openMenu={openMenu} handleOpenMenu={handleOpenMenu}/> 
      {/* header covers some elements */}
      <main className="retrievedRoute" style={resizePadding()}>
        <div className="retrievedRoute__titleAndButtons">
          <Link to={"/saved-routes"}>
            <button className="retrievedRoute__backButton">
              <img
                className="retrievedRoute__backArrowImage"
                src={backArrow}
                alt="Back Arrow"
              />
            </button>
          </Link>

          <h1 className="retrievedRoute__routeTitle">
            {location.state.route_name}
          </h1>

          {isDeletePopup && (
            <section className="deletePopUp">
              <div className="deletePopUp__container">
                <button
                  onClick={deletePopup}
                  className="deletePopUp__closeButton"
                >
                  &times;
                </button>

                <>
                  <h1 className="deletePopUp__title">
                    Are you sure you want to delete?
                  </h1>

                  <div className="deletePopUp__yesOrNoButtonsContainer">
                    <Link to={"/saved-routes"}>
                      <button
                        className="deletePopUp__yesButton"
                        onClick={handleDelete}
                      >
                        Yes delete
                      </button>
                    </Link>

                    <button
                      className="deletePopUp__noButton"
                      onClick={deletePopup}
                    >
                      No
                    </button>
                  </div>
                </>
              </div>
            </section>
          )}

          <button
            onClick={deletePopup}
            className="retrievedRoute__deleteButton"
          >
            <img src={whiteDeleteIcon} className="savedRoutes__deleteIcon" />
          </button>
        </div>

        <DynamicMap
          routeIsCreated={routeIsCreated}
          markerCoordinatesArray={markerCoordinatesArray}
          setRouteIsCreated={setRouteIsCreated}
          setMarkerCoordinatesArray={setMarkerCoordinatesArray}
          loadedRoute={loadedRoute}
        />
      </main>
    </>
  );
}
