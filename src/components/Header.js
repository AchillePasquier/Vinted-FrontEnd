import LogoVinted from "../images/logo.svg";
import { Link } from "react-router-dom";

const Header = ({
  handleToken,
  userToken,
  setSearch,
  sortPrice,
  setSortPrice,
}) => {
  return (
    <header>
      <Link to={"/"}>
        <img src={LogoVinted} alt="Logo-Vinted" />
      </Link>
      <div className="buttons">
        <input
          type="checkbox"
          checked={sortPrice}
          onClick={() => {
            setSortPrice(!sortPrice);
          }}
        ></input>
        <input
          type="text"
          placeholder="Rechercher des articles"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
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
