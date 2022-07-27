import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); //pour éviter de rafraichir la page lors de la soumission du formulaire
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username, // on aaurait pu écrire juste username car la clé et sa valeur ont le même nom
          email: email,
          password: password,
          newsletter: newsLetter,
        }
      );
      //console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="log-sign-page">
      <form className="signup-container" onSubmit={handleSubmit}>
        <h1 className="log-sign-h1">S'inscrire</h1>
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="newsletter">
          <input
            type="checkbox"
            checked={newsLetter}
            onChange={() => {
              setNewsLetter(!newsLetter);
            }}
          />
          <p>S'inscrire à notre newsletter</p>
        </div>

        <input className="submit-input" type="submit" value="S'inscrire" />
        <Link to={"/login"}>
          <p className="other">Tu as déja un compte ? Connecte-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
