import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import homeVinted from "../images/home-vinted.jpeg";
import tear from "../images/tear.svg";

import PriceRange from "../components/PriceRange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ search, sortPrice, setSortPrice }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          `https://backend-vinted-achille.herokuapp.com/offers?limit=12&page=${page}&priceMin=${
            fetchRangeValues[0]
          }&priceMax=${fetchRangeValues[1]}&title=${search}&sort=${
            sortPrice ? "price-desc" : "price-asc"
          }`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, [page, search, sortPrice, fetchRangeValues]);

  return isLoading ? (
    <>
      <div className="loader"></div>
      <h1 className="chargement">Chargement</h1>
    </>
  ) : (
    <div className="home">
      <div className="hero-home">
        <div className="ready-to-sale">
          <h2 className="ready-to-sale-h2">
            Prêts à faire du tri dans vos placards ?
          </h2>
          <Link to={"/publish"}>
            <button className="selling-button">Commencer à vendre</button>
          </Link>
        </div>
        <img src={tear} alt="tear" className="tear" />
        <img src={homeVinted} alt="dressing" className="dressingPicture" />
      </div>
      <div className="filter-price">
        <div className="sort-price">
          {" "}
          <p>Trier par prix :</p>
          <span className="checkbox">
            <input
              type="checkbox"
              checked={sortPrice}
              onChange={() => {}}
              name="price"
            />
            <div
              className="wrapper"
              onClick={() => {
                setSortPrice(!sortPrice);
              }}
            >
              <div className="knob">
                <span>{sortPrice ? "⇣" : "⇡"}</span>
              </div>
            </div>
          </span>
        </div>

        {/* <div className="sort-price">
          <p>Prix {sortPrice ? "décroissants" : "croissants"}</p>
          <input
            type="checkbox"
            checked={sortPrice}
            onClick={() => {
              setSortPrice(!sortPrice);
            }}
            defaultChecked={false}
          ></input>
        </div> */}
        <div className="price-range">
          <p>Prix entre : </p>
          <PriceRange setFetchRangeValues={setFetchRangeValues} />
        </div>
      </div>

      <h2 className="home-h2">Articles en vente</h2>
      <div className="list-of-offers">
        {data.offers.map((offer, index) => {
          return (
            <Link
              className="offer-in-list"
              key={offer._id}
              to={`/offer/${offer._id}`}
            >
              <img src={offer.product_image.secure_url} alt="clothes" />
              <p className="price">{offer.product_price.toFixed(2)} €</p>
              <p className="name">{offer.product_name}</p>
            </Link>
          );
        })}
      </div>
      <div className="setpage">
        <FontAwesomeIcon
          className="arrows"
          icon="angle-left"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        />
        <p className="current-page">{page}</p>
        {/* <p onClick={() => setPage(page + 1)}>{page + 1} </p>
        <p onClick={() => setPage(page + 2)}>{page + 2}</p> */}
        <FontAwesomeIcon
          className="arrows"
          icon="angle-right"
          onClick={() => setPage(page + 1)}
        />
        {/* <button onClick={() => setPage(page - 1)}> - </button>
        <p>{page}</p>
        <button onClick={() => setPage(page + 1)}> + </button> */}
      </div>
    </div>
  );
};

export default Home;
