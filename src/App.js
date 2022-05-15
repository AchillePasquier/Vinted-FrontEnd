import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

import "./App.css";
import "./index.css";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Header from "./components/Header";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null); //cette expression renvoie la valeur du cookie s'il existe
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState(false);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header
        handleToken={handleToken}
        userToken={userToken}
        setSearch={setSearch}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
      />
      <Routes>
        <Route
          path="/"
          element={<Home search={search} sortPrice={sortPrice} />}
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
