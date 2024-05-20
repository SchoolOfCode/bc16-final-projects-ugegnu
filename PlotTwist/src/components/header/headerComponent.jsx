import "./headerComponent.css";
import logoUPLOT from "../../assets/logoUPLOT.png";
import menuIcon from "../../assets/icons8-menu (1).svg";
import homeIconGreen from "../../assets/homeIconGreen.png";
import createRouteIconGreen from "../../assets/createRouteIconGreen.png";
import savedIconGreen from "../../assets/savedIconGreen.png";
import { Link } from "react-router-dom";

export default function Header({ openMenu, handleOpenMenu }) {
  return (
    <header className="header">
      <Link to={"/"}>
        <img className="header__logo" src={logoUPLOT} alt="U-Plot logo"></img>
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
              : "header__navigationMenu slide-out-top"
          }
        >
          <ul className="header__linksList">
            <Link className="header__link fixBorder" to={"/"}>
              <img
                className="header__homeIcon"
                src={homeIconGreen}
                alt="Home icon"
              ></img>
              <li className="header__linkItem">HOME</li>
            </Link>
            <Link className="header__link fixBorder" to={"../create-route"}>
              <img
                className="header__markerIcon"
                src={createRouteIconGreen}
                alt="Marker icon"
              ></img>
              <li className="header__linkItem">CREATE ROUTE</li>
            </Link>
            <Link className="header__link" to={"../saved-routes"}>
              <img
                className="header__savedIcon"
                src={savedIconGreen}
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
