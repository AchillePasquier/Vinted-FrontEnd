import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import homeVinted from "../images/home-vinted.jpeg";

const Home = ({ search, sortPrice }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=8&page=${page}&title=${search}&sort=${
            sortPrice ? "price-desc" : "price-asc"
          }`
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, [page, search]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="home">
      <img src={homeVinted} alt="dressing" className="dressingPicture" />
      <button onClick={() => setPage(page - 1)}> - </button>
      <p>{page}</p>
      <button onClick={() => setPage(page + 1)}> + </button>
      <div className="list-of-offers">
        {data.offers.map((offer, index) => {
          return (
            <Link
              className="offer-in-list"
              key={offer._id}
              to={`/offer/${offer._id}`}
            >
              <p>{offer.product_name}</p>
              <img src={offer.product_image.secure_url} alt="clothes" />
              <p>Prix : {offer.product_price} €</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
