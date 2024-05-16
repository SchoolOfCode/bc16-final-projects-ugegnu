import { Link, createRoutesFromChildren } from "react-router-dom";
import HomePageBG from "../../assets/HomePageBG.png";
import FullLogo from "../../assets/FullLogo.png";
import "./homePage.css";
import HomePageworldlayer from "../../assets/HomePage-world-layer.png";
export default function HomePage() {
  return (
    <>
      <main
        className="mainHomePage">
        <img src={FullLogo} alt="Logo" className="mainHomePage__logo" />
        <img
          src={HomePageworldlayer}
          alt="Background"
          className="mainHomePage__HomepageWorldLayer"
      >
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
