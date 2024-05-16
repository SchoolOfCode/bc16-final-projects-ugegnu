import { Link, createRoutesFromChildren } from "react-router-dom";
import FullLogo from "../../assets/FullLogo.png";
import "./homePage.css";
import HomePageworldlayer from "../../assets/HomePage-world-layer.png";
export default function HomePage() {
  return (
    <>
      <main className="mainHomePage">
        <img
          src={HomePageworldlayer}
          alt="spinningWorld"
          className="mainHomePage__HomepageWorldLayer"
        />
        <img className="mainHomePage__logo" src={FullLogo}></img>
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
      </main>
    </>
  );
}
