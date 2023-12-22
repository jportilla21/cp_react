import React, { useState, useContext } from "react";
import ItemCount from "../ItemCount/ItemCount";
import Item from "../Item/Item";
import CartContext from "../../contexts/cartContext";
import "./ItemDetail.css";
import { Button } from "@material-ui/core";

const ItemDetail = ({ product }) => {
  const { setCart, setQnt } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [article, setArticle] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
    quantity: quantity, 
    category: product.category,
    image: product.image,
  });

  const handleClick = () => {
    setQnt((value) => value + quantity);
    const prod = {
      ...article,
      quantity,
    };

    setCart((value) => [...value, prod]);
  };

  const handleQuantityChange = (newQuantity) => {
    // OMITI ESTO CAMBIO 1 const difference = newQuantity - quantity;
    setQuantity(newQuantity);
    setArticle((prevArticle) => ({
      ...prevArticle,
      // OMITI ESTO CAMBIO 1 quantity: prevArticle.quantity + difference, AÑADI ESTO:
      quantity: newQuantity,
    }));
  };

  return (
    <div className="item-detail">
      <Item product={product} />
      <ItemCount
        initial={1}
        min={0}
        max={product.stock}
        setQuantity={handleQuantityChange}
      />
      <Button
        className="item-detail__btn"
        variant="contained"
        onClick={handleClick}
      >
        Añadir al Carrito: Cant.{quantity}
      </Button>
    </div>
  );
};

export default ItemDetail;
