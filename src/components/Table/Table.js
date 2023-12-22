import React, { useEffect, useContext } from "react";
import CartContext from "../../contexts/cartContext";
import "./Table.css";

const Table = () => {
  const { cart, setCart, setQnt } = useContext(CartContext);

  const deleteProduct = (index) => {
    setCart(cart.filter((product, i) => i !== index));
  };

  useEffect(() => {
    setQnt(
      cart
        .map((product) => product.quantity)
        .reduce((total, valor) => total + valor)
    );
  }, [cart, setQnt]);

  return (
    <div className="table-data">
      <div className="table-data__title">
        <h1>Resumen de tu Compra</h1>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Cantidad</th>
            <th scope="col">Ítem</th>
            <th scope="col">Precio Unitario</th>
            <th scope="col">Total</th>
            <th scope="col">Borrar Ítem</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.quantity}</th>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>${item.quantity * item.price}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(index)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
