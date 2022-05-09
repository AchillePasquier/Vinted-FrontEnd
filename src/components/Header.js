import LogoVinted from "../images/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ handleToken, userToken }) => {
  return (
    <header>
      <Link to={"/"}>
        <img src={LogoVinted} alt="Logo-Vinted" />
      </Link>
      <div className="buttons">
        {!userToken ? (
          <>
            <Link to={"/login"}>
              <button>Connexion</button>
            </Link>
            <Link to={"/signup"}>
              <button>S'inscrire</button>
            </Link>
          </>
        ) : (
          <Link to={"/"}>
            <button
              onClick={() => {
                handleToken();
              }}
            >
              Déconnexion
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
