import "./headerComponent.css";
import logo from "../../assets/logo.png";
import menuIcon from "../../assets/icons8-menu (1).svg";
import homeIcon from "../../assets/home-icon.svg";
import help from "../../assets/help.png";
import createRoute from "../../assets/create-route.png";
import savedRoutes from "../../assets/saved-routes.png";
import { Link } from "react-router-dom";

export default function Header({ openMenu, handleOpenMenu }) {
  return (
    <header className="header">
      <Link to={"/"}>
        <img className="header__logo" src={logo} alt="U-Plot logo"></img>
      </Link>
      {!openMenu && (
        <>
          <button className="header__openButton" onClick={handleOpenMenu}>
            <img
              className="header__burger"
              src={menuIcon}
              alt="Burger menu icon"
            ></img>
          </button>
        </>
      )}

      {openMenu && (
        <nav
          className={
            openMenu
              ? "header__navigationMenu slide-in-top"
              : // else if openMenu closed ?
                "header__navigationMenu slide-out-top"
          }
          // Either hover quick fix
          // or OnClick on budy slide out
        >
          <ul className="header__linksList">
            <Link className="header__link fixBorder" to={"/"}>
              <img
                className="header__homeIcon"
                src={homeIcon}
                alt="Home icon"
              ></img>
              <li className="header__linkItem">HOME</li>
            </Link>
            <Link className="header__link fixBorder" to={"../create-route"}>
              <img
                className="header__markerIcon"
                src={createRoute}
                alt="Marker icon"
              ></img>
              <li className="header__linkItem">CREATE ROUTE</li>
            </Link>
            <Link className="header__link" to={"../saved-routes"}>
              <img
                className="header__savedIcon"
                src={savedRoutes}
                alt="Saved icon"
              ></img>
              <li className="header__linkItem">SAVED ROUTES</li>
            </Link>
          </ul>
          <button className="header__closeButton" onClick={handleOpenMenu}>
            &times;
          </button>
        </nav>
      )}
    </header>
  );
}
