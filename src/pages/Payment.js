import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const userToken = Cookies.get("userToken");
  //   console.log(userToken);

  const location = useLocation().state;
  //   console.log(location);
  const { data } = location; // ici data équivaut à location.state.data
  console.log(data);
  let total = (data.product_price + data.product_price * 0.1 + 3.2).toFixed(2);

  return userToken ? (
    <div className="log-sign-page">
      <div className="ordered-container">
        <p className="ordered-resume">Résumé de la commande</p>
        <div className="ordered-line">
          <p>Commande</p>
          <p>{data.product_price.toFixed(2)} €</p>
        </div>
        <div className="ordered-line">
          <p>Frais de proctection acheteurs</p>
          <p>{(data.product_price * 0.1).toFixed(2)} €</p>
        </div>
        <div className="ordered-line">
          <p>Frais de port</p>
          <p>3.20 €</p>
        </div>
        <div className="total-line">
          <p>Total</p>
          <p>{total} €</p>
        </div>
        <p className="end-ordered">
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <span className="bolder">{data.product_name}</span>. Vous allez payer{" "}
          <span className="bolder">{total} €</span> (frais de protection des
          frais de port inclus).
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
