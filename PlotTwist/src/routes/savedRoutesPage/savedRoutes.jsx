import { Link, createRoutesFromChildren } from "react-router-dom";
import Header from "../../components/header/headerComponent";
import { useEffect, useState } from "react";
import "./savedRoutes.css";
import RetrievedRoutePage from "../retrievedRoutePage/retrievedRoutePage";
import loadingsymbol from "../../assets/tube-spinner.svg";
import logo from "../../assets/FullLogo.png";
import whiteDeleteIcon from "../../assets/whiteDeleteIcon.png";

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

  const deleteRoute = async (id) => {
    // the value of the delete button has been set to route.id
    // hence e.target.value will be route.id
    setDeleteLoading(true);
    // console.log(e.currentTarget + "e value");
    // const id = e.target.value;
    const response = await fetch(
      `https://final-project-backend-lp20.onrender.com/delete/${id}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    // console.log(data);
    setDeleteSuccess(true);
    setDeleteLoading(false);
    //This function is called after the deletion to re-render on page load, this will populate the routes
    getAllRoutes();
  };

  const getAllRoutes = async () => {
    //This function fetches all the routes form the backend.
    console.log("Fetching routes...");
    const response = await fetch(
      "https://final-project-backend-lp20.onrender.com/routes"
    );
    //changes the data into json so we can display it on the screen
    const data = await response.json();
    //the fetch routes are then store in routes state by using the setRoutes function.
    console.log(data);
    setRoutes(data.payload);
    setIsLoading(false);
  };

  // could add artifical timer for UX
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

    async function getRouteById(id) {
      console.log(`getting route... ${id}`);
      const response = await fetch(
        `https://final-project-backend-lp20.onrender.com/route/${id}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    }
  }

  const deletePopup = (id) => {
    setDeleteSuccess(false);
    setDeleteLoading(false);
    setDeletePopup(!isDeletePopup);
    setRouteValueToBeDeleted(id);
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
  // console.log(routeValueToBeDeleted + " routeVal");

  const resizePadding = () => {
    if (openMenu && Number(screenWidth) < 1024 && Number(screenWidth) > 500) {
      return { paddingTop: "365px" };
    } else if (openMenu && Number(screenWidth) < 500) {
      return { paddingTop: "250px" };
    } else {
      return { paddingTop: "120px" };
    }
  };

  return (
    <>
      <Header openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
      <main className="savedRoutes" style={resizePadding()}>
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
          <>
            <div className="savedRoutes__banner">
              <h1 className="savedRoutes__Bannerheader">Saved Routes</h1>
            </div>
            <table className="savedRoutes__tableContainer">
              <tbody className="savedRoutes__table">
                {routes.map((route, index) => {
                  return (
                    <tr className="savedRoutes__row" key={index}>
                      <td className="savedRoutes__routeName">
                        {route.route_name}
                      </td>
                      <td className="savedRoutes__retrieve">
                        <Link to={"/retrieved-route"} state={route}>
                          <button
                            // onClick={handleRetrieve}
                            className="savedRoutes__retrieveRouteButton"
                            value={route.id}
                          >
                            Retrieve Route
                          </button>
                        </Link>
                      </td>
                      <td className="savedRoutes__delete">
                        {/* this button below is the target... delete route button... */}

                        <button
                          className="savedRoutes__deleteButton"
                          onClick={() => deletePopup(route.id)}
                        >
                          <img
                            src={whiteDeleteIcon}
                            className="savedRoutes__deleteIcon"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </main>
      {isDeletePopup && (
        <section onClick={deletePopup} className="deletePopUp">
          <div className="deletePopUp__container">
            <button onClick={deletePopup} className="deletePopUp__closeButton">
              &times;
            </button>

            {!deleteSuccess ? (
              <>
                <h1 className="deletePopUp__title">
                  Are you sure you want to delete?
                </h1>
                <div className="deletePopUp__yesOrNoButtonsContainer">
                  <button
                    className="deletePopUp__yesButton"
                    onClick={() => deleteRoute(routeValueToBeDeleted)}
                  >
                    Yes delete
                  </button>
                  <button
                    className="deletePopUp__noButton"
                    onClick={hideDeletePopup}
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <> {deleteLoading ? <h1>Deleting</h1> : <h1>Deleted!</h1>}</>
            )}
          </div>
        </section>
      )}
    </>
  );
}

// opening para graph
