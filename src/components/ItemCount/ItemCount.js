import React, { useState } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import "./ItemCount.css";

const ItemCount = ({ initial, min, max, setQuantity }) => {
  const [quantity, setInternalQuantity] = useState(initial);

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setInternalQuantity(newQuantity);
      setQuantity(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setInternalQuantity(newQuantity);
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="counter" style={{ width: "15rem" }}>
      <div className="counter__content">
        <div className="counter__content-controls">
          <span
            className="counter__content-controls-subtract"
            onClick={handleDecrement}
          >
            <RemoveIcon />
          </span>
          <span className="counter__content-controls-value">{quantity}</span>
          <span
            className="counter__content-controls-add"
            onClick={handleIncrement}
          >
            <AddIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCount;

