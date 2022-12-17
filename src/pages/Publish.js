import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", state);
      formData.append("city", location);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://backend-vinted-achille.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      alert("Votre annonce a été publiée 😉");
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return userToken ? (
    <div className="log-sign-page">
      <div className="selling-container">
        <h1 className="log-sign-h1">Publier une annonce</h1>
        {!picture ? (
          <div className="file-container">
            <label for="file" class="label-file">
              Ajoute une photo{" "}
            </label>
            <FontAwesomeIcon className="add-image-icon" icon="plus" />

            <input
              id="file"
              // value={picture}
              type="file"
              onChange={(event) => {
                //console.log(event.target.files[0].name);
                setPicture(event.target.files[0]);
              }}
            />
          </div>
        ) : (
          <img
            className="img-product"
            src={URL.createObjectURL(picture)}
            alt=""
          />
        )}

        <input
          className="form-input"
          value={title}
          type="text"
          placeholder="Titre"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          className="form-input"
          value={description}
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
        <input
          className="form-input"
          value={brand}
          type="text"
          placeholder="Marque"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          className="form-input"
          value={size}
          type="text"
          placeholder="Taille"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          className="form-input"
          value={color}
          type="text"
          placeholder="Couleur"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <input
          className="form-input"
          value={state}
          type="text"
          placeholder="État"
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
        <input
          className="form-input"
          value={location}
          type="text"
          placeholder="Lieu"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <p className="selling-price">Prix</p>
        <input
          className="form-input"
          value={price}
          type="number"
          placeholder="Prix"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <button className="submit-input" onClick={handleSubmit}>
          Publier
        </button>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
