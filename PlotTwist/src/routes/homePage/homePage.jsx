import { Link } from "react-router-dom";
import UPLOTfullLogo from "../../assets/UPLOTfullLogo.png";
import "./homePage.css";
import HomePageworldlayer from "../../assets/HomePage-world-layer.png";
import coachLayer from "../../assets/coachLayer.png";

export default function HomePage() {
  return (
    <>
      <main className="mainHomePage">
        <div className="mainHomePage__layers">
          <img
            src={coachLayer}
            alt="spinningWorld"
            className="mainHomePage__HomePageCoachlayer"
          />
          <img
            src={HomePageworldlayer}
            alt="spinningWorld"
            className="mainHomePage__HomepageWorldLayer"
          />
        </div>
        <div className="mainHomePage__overLayers">
          <img className="mainHomePage__logo" src={UPLOTfullLogo} />
          <div className="mainHomePage__routes">
            <Link to={"create-route"}>
              <button className="mainHomePage__createRouteButtons">
                Create Routes
              </button>
            </Link>
            <Link to={"saved-routes"}>
              <button className="mainHomePage__savedRoutesButtons">
                Saved Routes
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
