import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ product }) => {
  const { name, description, price, image } = product;

  return (
    <div className="link">
      <Link to={`/item/${product.id}`}>
        <div className="counter link__item" style={{ width: "15rem" }}>
          <div className="counter__content">
            <h5 className="card-title">{name}</h5>
            <img
              src={image}
              className="card-img-top"
              alt="Imagen de Producto"
            />
            <div className="item-details">
              <span className="item-price">${price}</span>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
