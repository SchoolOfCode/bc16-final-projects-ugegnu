import { Link, createRoutesFromChildren } from "react-router-dom";
import Header from "../../components/header/headerComponent";
import { useEffect, useState } from "react";
import "./savedRoutes.css";
import RetrievedRoutePage from "../retrievedRoutePage/retrievedRoutePage";
export default function SavedRoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [retrieved, setRetrieved] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState({});

  // State for handling the header's styling
  const [openMenu, setOpenMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //To avoid another API call we are using this function to call at the end to show the list.
  const deleteRoute = async (e) => {
    // the value of the delete button has been set to route.id
    // hence e.target.value will be route.id
    console.log(e.target.value);
    const id = e.target.value;
    const response = await fetch(
      `https://final-project-backend-lp20.onrender.com/delete/${id}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    console.log(data);
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

    setRoutes(data.payload);
  };

  useEffect(() => {
    // this ensures that getAllRoutes is called only once when the component is first rendered.
    getAllRoutes();
  }, []);

  async function handleRetrieve(e) {
    console.log("hi");
    if (retrieved === true) {
      setRetrieved(false);
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
        {retrieved ? (
          <RetrievedRoutePage
            handleRetrieve={handleRetrieve}
            selectedRoute={selectedRoute}
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
                      <button
                        className="savedRoutesTable__deleteRouteButton"
                        value={route.id}
                        onClick={deleteRoute}
                      >
                        Delete Button
                      </button>
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

// opening para graph
