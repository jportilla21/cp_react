import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import Loading from "../../components/Loading/Loading";
import { Images } from "../../utils/images"; 
import "./Categories.css";

const Categories = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulatedProducts = [
      { id: 1, name: "Arnes", image: Images.Arena, price: 132000, category: "seguridad" }, 
      { id: 2, name: "Botas", image: Images.Botas, price: 84000, category: "seguridad" }, 
      { id: 3, name: "Casco", image: Images.Casco, price: 96000, category: "seguridad" }, 
      { id: 4, name: "Gafas", image: Images.Gafas, price: 19000, category: "seguridad" }, 
      { id: 5, name: "Guantes", image: Images.Guantes, price: 56000, category: "seguridad" },
      { id: 6, name: "Tapaoído", image: Images.Tapaoido, price: 9000, category: "seguridad" },  
      { id: 7, name: "Arena", image: Images.Arena, price: 190000, category: "materiales" }, 
      { id: 8, name: "Grava", image: Images.Grava, price: 266000, category: "materiales" }, 
      { id: 9, name: "Ladrillo", image: Images.Ladrillo, price: 2900, category: "materiales" },  
    ];

    const filteredProducts = simulatedProducts.filter(
      (product) => product.category === categoryId
    );

    setTimeout(() => {
      setProducts(filteredProducts);
      setLoading(false);
    }, 1000); 
  }, [categoryId]);

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  return (
    <div className="categories">
      <h1>Categoría {categoryId}</h1>
      {loading ? (
        <Loading text="..." />
      ) : (
        <div className="categories__list">
          {products.map((product) => {
            return (
              <ItemDetail
                key={product.id}
                product={product}
                setQuantity={handleQuantityChange}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
