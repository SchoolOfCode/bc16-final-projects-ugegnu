import { Link, createRoutesFromChildren } from "react-router-dom";
import Header from "../../components/header/headerComponent";
import { useEffect, useState } from "react";
import "./savedRoutes.css";
import RetrievedRoutePage from "../retrievedRoutePage/retrievedRoutePage";
import loadingsymbol from "../../assets/tube-spinner.svg";
import logo from "../../assets/FullLogo.png";

export default function SavedRoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [retrieved, setRetrieved] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // State for handling the header's styling
  const [openMenu, setOpenMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //state for the delete button popup
  const [isDeletePopup, setDeletePopup] = useState(false);
  const [routeValueToBeDeleted, setRouteValueToBeDeleted] = useState(0);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  //To avoid another API call we are using this function to call at the end to show the list.

  const deleteRoute = async (e) => {
    const id = routeValueToBeDeleted.payload.id;
    const routeName = routeValueToBeDeleted.payload.route_name;
    try {
      // the value of the delete button has been set to route.id
      // hence e.target.value will be route.id
      setDeleteLoading(true);

      // console.log(e.target.value);

      const response = await fetch(
        `https://final-project-backend-lp20.onrender.com/delete/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setDeleteSuccess(true);
      setDeleteLoading(false);
      //This function is called after the deletion to re-render on page load, this will populate the routes
      getAllRoutes();
    } catch (error) {
      alert(`Failed to delete the route: "${routeName}"`);
      console.error("Failed to delete the route, Carol");
    }
  };

  const getAllRoutes = async () => {
    try {
      //This function fetches all the routes form the backend.
      console.log("Fetching routes...");
      const response = await fetch(
        "https://final-project-backend-lp20.onrender.com/routes"
      );

      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      //changes the data into json so we can display it on the screen
      const data = await response.json();
      //the fetch routes are then store in routes state by using the setRoutes function.
      console.log(data);
      setRoutes(data.payload);
    } catch (error) {
      console.error("Failed to get the route:");
      alert("Couldn't get all routes, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // this ensures that getAllRoutes is called only once when the component is first rendered.
    getAllRoutes();
  }, []);

  async function handleRetrieve(e) {
    console.log("hi");
    if (retrieved === true) {
      setRetrieved(false);
      // setIsLoading(true)
      // setInterval(() => setIsLoading(false), 1000)
      getAllRoutes();
    } else {
      setSelectedRoute(await getRouteById(e.target.value));
      setRetrieved(true);
    }
  }

  async function getRouteById(id) {
    try {
      console.log(`getting route... ${id}`);
      const response = await fetch(
        `https://final-project-backend-lp20.onrender.com/route/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Failed to get the route:");
      alert("Failed to get the route, get by id.");
    }
  }

  const deletePopup = async (e) => {
    // console.log(e.target.value);
    setDeleteSuccess(false);
    setDeleteLoading(false);
    setDeletePopup(!isDeletePopup);
    let routeToBeDeleted;
    if (e.target.value) {
      routeToBeDeleted = await getRouteById(e.target.value);
    }
    setRouteValueToBeDeleted(routeToBeDeleted);
  };

  const hideDeletePopup = () => {
    setDeletePopup(!isDeletePopup);
    setDeleteSuccess(false);
    setDeleteLoading(false);
  };

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
        style={
          openMenu && Number(screenWidth) < 1024
            ? { paddingTop: "365px" }
            : { paddingTop: "120px" }
        }
      >
        {/* table with .map - show name and button */}

        {isLoading ? (
          <div className="savedRoutes__loading-div">
            <img className="uplot-logo" src={logo}></img>
            <img className="loading-gif" src={loadingsymbol}></img>
          </div>
        ) : retrieved ? (
          <RetrievedRoutePage
            handleRetrieve={handleRetrieve}
            selectedRoute={selectedRoute}
            setRetrieved={setRetrieved}
            getAllRoutes={getAllRoutes}
          />
        ) : (
          <table className="savedRoutesTable">
            <tbody>
              <tr>
                <th>Route Name</th>
              </tr>
              {routes.map((route, index) => {
                return (
                  <tr key={index}>
                    <td>{route.route_name}</td>
                    <td>
                      <Link to={"retrieved-route"}></Link>
                      <button
                        onClick={handleRetrieve}
                        className="savedRoutesTable__retrieveRouteButton"
                        value={route.id}
                      >
                        Retrieve Route
                      </button>
                    </td>
                    <td>
                      {/* this button below is the target... delete route button... */}

                      <button onClick={deletePopup} value={route.id}>
                        Delete Button
                      </button>
                      {isDeletePopup && (
                        //aim to get the value of the above button and so only make a div where the value matches that
                        //if(value===value) {
                        <div className="savedRoutesTable__deletePopUp">
                          <button onClick={deletePopup}>X</button>
                          {!deleteSuccess ? (
                            <>
                              <h1>Are you sure you want to delete?</h1>
                              <button
                                className="savedRoutesTable__deleteRouteButton"
                                value={routeValueToBeDeleted}
                                onClick={deleteRoute}
                              >
                                Yes delete
                              </button>
                              <button onClick={hideDeletePopup}>No</button>
                            </>
                          ) : (
                            <>
                              {" "}
                              {deleteLoading ? (
                                <h1>Deleting</h1>
                              ) : (
                                <h1>Deleted!</h1>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
