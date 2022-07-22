import LogoVinted from "../images/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = ({ handleToken, userToken, setSearch }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <header>
      <div className="container header">
        <Link to={"/"}>
          <img src={LogoVinted} alt="Logo-Vinted" />
        </Link>
        <div className="buttons">
          <div className="search-bar">
            <FontAwesomeIcon className="search-icon" icon="magnifying-glass" />
            <input
              type="text"
              placeholder="Rechercher des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>

          {!userToken ? (
            <div className="login-signup">
              <Link to={"/login"}>
                <button className="log-sign-but">Connexion</button>
              </Link>
              <Link to={"/signup"}>
                <button className="log-sign-but">S'inscrire</button>
              </Link>
            </div>
          ) : (
            <Link to={"/"}>
              <button
                className="log-sign-but"
                onClick={() => {
                  handleToken();
                }}
              >
                Déconnexion
              </button>
            </Link>
          )}
          <Link to={"/publish"}>
            <button
              className="selling-button"
              // onClick={() => {
              //    handleToken();
              // }}
            >
              Vends tes articles
            </button>
          </Link>
        </div>
        <div
          className="menu-icon"
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          <FontAwesomeIcon icon={clicked ? "xmark" : "bars"} />
        </div>
      </div>
    </header>
  );
};

export default Header;
