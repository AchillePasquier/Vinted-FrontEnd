import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-vinted-achille.herokuapp.com/user/login",
        {
          email, // on écrit juste email et password car la clé et sa valeur ont le même nom
          password,
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
        <h1 className="log-sign-h1">Se connecter</h1>
        <input
          className="form-input"
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input className="submit-input" type="submit" value="Connexion" />
        <Link to={"/signup"}>
          <p className="other">Pas encore de compte ? Inscris-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
