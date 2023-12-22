import React, { useState, useEffect } from "react";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";
import Loading from "../Loading/Loading";
import { Images } from "../../utils/images"; 
import { Link } from "react-router-dom";
import "./ItemList.css";

const ItemList = ({ onAdd }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

const handleQuantityChange = (newQuantity) => {

};

  useEffect(() => {
    setLoading(true);
    const simulatedProducts = [
      {
        id: "1",
        name: "Arnes Industrial",
        stock: 10,
        price: 132000,
        quantity: 1,
        category: "seguridad",
        image: Images.Arnes, 
      },
      {
        id: "2",
        name: "Botas Industrial",
        stock: 100,
        price: 84000,
        quantity: 1,
        category: "seguridad",
        image: Images.Botas,  
      },
      {
        id: "3",
        name: "Casco",
        stock: 25,
        price: 96000,
        quantity: 1,
        category: "seguridad",
        image: Images.Casco, 
      },
      {
        id: "4",
        name: "Gafas",
        stock: 1000,
        price: 19000,
        quantity: 1,
        category: "seguridad",
        image: Images.Gafas,  
      },
      {
        id: "5",
        name: "Guantes",
        stock: 88,
        price: 56000,
        quantity: 1,
        category: "seguridad",
        image: Images.Guantes, 
      },
      {
        id: "6",
        name: "Tapa Oído",
        stock: 6700,
        price: 9000,
        quantity: 1,
        category: "seguridad",
        image: Images.Tapaoido,  
      },
      {
        id: "7",
        name: "Arena",
        stock: 5000,
        price: 190000,
        quantity: 1,
        category: "materiales",
        image: Images.Arena, 
      },
      {
        id: "8",
        name: "Grava",
        stock: 10000,
        price: 266000,
        quantity: 1,
        category: "materiales",
        image: Images.Grava,  
      },
      {
        id: "9",
        name: "Ladrillo",
        stock: 900,
        price: 2900,
        quantity: 1,
        category: "materiales",
        image: Images.Ladrillo,  
      },
    ];

    setTimeout(() => {
      setProducts(simulatedProducts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="list-container" id="list-container">
      {loading ? (
        <Loading text="..." />
      ) : (
        <div className="list-container__details">
          <div className="list-container__details-categories">
            <h3>Categorías:</h3>
            <Link to="/categories/seguridad">Seguridad Industrial</Link>
            <Link to="/categories/materiales">Materiales para Construcción</Link>
          </div>
          <div className="list-container__details-title">
            <h3>Productos</h3>
          </div>
          <div className="list-container__list">
            {products.map((product) => {
              return (
                <ItemDetailContainer
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                  setQuantity={handleQuantityChange}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
