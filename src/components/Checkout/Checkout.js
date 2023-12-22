import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/cartContext";
import "./Checkout.css";

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (cart.length > 0) {
      setTotalPrice(
        cart
          .map((product) => product.price * product.quantity)
          .reduce((total, valor) => total + valor)
      );
    }
  }, [cart]);

  return (
    <div className="checkout detalle-compra ">
      <div className="card text-center">
        <div className="card-header">Detalle de Compra</div>
        <div className="card-body">
          <h5 className="card-title">Total: ${totalPrice}</h5>
          <Link to="/form" className="btn btn-primary">
            Realizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
