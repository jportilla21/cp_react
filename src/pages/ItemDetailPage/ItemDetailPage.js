import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../../components/ItemCount/ItemCount";
import Loading from "../../components/Loading/Loading";
import CartContext from "../../contexts/cartContext";
import { Images } from "../../utils/images";
import "./ItemDetailPage.css";

const ItemDetailPage = () => {
  const { setCart, setQnt } = useContext(CartContext);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const simulatedProducts = [
      {
        id: "1",
        name: "Arnes Industrial",
        description: "Arnes industrial con hebillas y argollas laterales y de cadera. Pasadores de plásticos y tensor dorsal en tirantas.",
        stock: 10,
        price: 132000,
        quantity: 1,
        category: "seguridad",
        image: Images.Arnes, 
      },
      {
        id: "2",
        name: "Botas Industrial",
        description: "Bota industrial para construcción e industria livina. Viene en capellada de cuero y forro textil.",
        stock: 100,
        price: 84000,
        quantity: 1,
        category: "seguridad",
        image: Images.Botas,  
      },
      {
        id: "3",
        name: "Casco",
        description: "Casco industrial en general, refinería y minería. Resistente a golpes y rayaduras, cuenta con 4 puntos de apoyo, slot lateral universal compatible con protectores auditivos tipo copa y visores faciales, visera corta y tafilete con banda antisudor.",
        stock: 25,
        price: 96000,
        quantity: 1,
        category: "seguridad",
        image: Images.Casco, 
      },
      {
        id: "4",
        name: "Gafas",
        description: "Gafas de seguridad industrial con marco en nylon. Brazo entensible ajustable a 4 posiciones y protección lateral.",
        stock: 1000,
        price: 19000,
        quantity: 1,
        category: "seguridad",
        image: Images.Gafas,  
      },
      {
        id: "5",
        name: "Guantes",
        description: "Par guante ergo en material cuero tela. Garantía de 60 días por defectos de fábrica.",
        stock: 88,
        price: 56000,
        quantity: 1,
        category: "seguridad",
        image: Images.Guantes, 
      },
      {
        id: "6",
        name: "Tapa Oído",
        description: "Protector de oido tipo copa para construcción. Es un protector auditivo dieléctrico ya que no posee componentes metálicos. Posee un espacio para generar el acople a todo tipo de orejas.",
        stock: 6700,
        price: 9000,
        quantity: 1,
        category: "seguridad",
        image: Images.Tapaoido,  
      },
      {
        id: "7",
        name: "Arena",
        description: "Arena para construcción. Aplicación y uso para muros, paredes, divisiones y estructuras.",
        stock: 5000,
        price: 190000,
        quantity: 1,
        category: "materiales",
        image: Images.Arena, 
      },
      {
        id: "8",
        name: "Grava",
        description: "Grava para construcción. Se recomienda aplicar sobre una superficie plana, libre de humedad y cubrir de la lluvia.",
        stock: 10000,
        price: 266000,
        quantity: 1,
        category: "materiales",
        image: Images.Grava,  
      },
      {
        id: "9",
        name: "Ladrillo",
        description: "Ladrillo de alta calidad, resistente y duradero, compacto en su estructura con garantía de 1 año.",
        stock: 900,
        price: 2900,
        quantity: 1,
        category: "materiales",
        image: Images.Ladrillo,  
      },
    ];
  
    const selectedProduct = simulatedProducts.find((prod) => prod.id === id);

    if (selectedProduct) {
      setProduct(selectedProduct);
      setLoading(false);
    } else {
      console.log("Producto no encontrado");
    }
  }, [id]);

  const handleClick = () => {
    setQnt((value) => value + quantity);

    const prod = {
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
      quantity: quantity, 
      category: product.category,
      image: product.image,
    };

    setCart((value) => [...value, prod]);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const onAdd = () => {
    const prod = {
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
      quantity: quantity, 
      category: product.category,
      image: product.image,
    };
  
    setCart((prevCart) => [...prevCart, prod]);
    setQnt((prevQuantity) => prevQuantity + quantity);
  };
  
  return (
    <div className="itemPage">
      {loading ? (
        <div className="loading-items" style={{ margin: "0 auto" }}>
          <Loading text="Cargando productos..." />
        </div>
      ) : (
        <div className="container itemPage__detail">
          <div className="row">
            <div className="col-sm-12 col-md-4 itemPage__detail-image">
              <div>
                <img
                  src={Images[product.image]}
                  className="card-img-top"
                  alt="Imagen de Producto"
                  style={{ width: "300px", height: "auto" }}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-4 itemPage__detail-buy">
              <div>
                <div className="counter item itemPage__detail-buy-sale">
                  <div className="">
                    <h3 className="card-title">{product.name}</h3>
                    <p>{product.description}</p>
                    <h3>${product.price}</h3>
                    <h6>Stock: {product.stock}</h6>
                  </div>
                  <div className="itemPage__detail-buy-sale-buttons">
                    <ItemCount
                      initial={1}
                      min={0}
                      max={product.stock}
                      onAdd={onAdd}
                      setQuantity={handleQuantityChange}
                      quantity={quantity}
                    />
                    <div className="counter btn-buy" style={{ width: "15rem" }}>
                      <div className="counter__buttonAdd">
                        <button onClick={onAdd}>Añadir a carrito {quantity}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;