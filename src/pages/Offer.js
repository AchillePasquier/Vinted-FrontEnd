import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //   const params = useParams();
  //   console.log(params); affiche un objet avec une clé id: qui correspond à l'id de l'offre car .../offer/:id on peut donc destructurer :

  const { id } = useParams();
  //console.log(id); //affiche juste l'id.

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="offer-page">
      <Link to={"/"}>
        <button className="back-button">
          <FontAwesomeIcon className="arrow-left" icon="arrow-left" />
          Retour
        </button>
      </Link>
      <div className="offer">
        <img src={data.product_image.secure_url} alt="clothe" />
        <div className="offer-description">
          <h2>{data.product_name}</h2>
          <p>Prix : {data.product_price} €</p>
          {data.product_details.map((detail, index) => {
            //product_details est un tableau d'objet avec dans chaque objet soit la marque et sa valeur, soit la couleur et sa valeur etc.
            const keyName = Object.keys(detail); // Object.keys() renvoie le nom des clés de l'objet sous forme de tableau (ici on a qu'une clé par objet)
            //console.log(keyName[0]); //affiche juste le nom de la clé
            return (
              <div key={index} className="product-details">
                <span>{keyName[0]} : </span>
                <span>{detail[keyName[0]]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Offer;
