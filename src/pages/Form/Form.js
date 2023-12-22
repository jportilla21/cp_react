// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import CartContext from '../../contexts/cartContext';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import { getFirestore } from '../../firebase/index';
// import "./Form.css";

// function Field({
//   name,
//   inputLabel,
//   nameField,
//   style,
//   type,
//   id,
//   placeholder,
//   valueInput,
//   onChange,
// }) {
//   return (
//     <>
//       <div className="col-sm-6">
//         <label
//           htmlFor={inputLabel}
//           name={name}
//           className="form-label"
//           style={style}
//         >
//           {nameField}
//         </label>
//         <input
//           type={type}
//           value={valueInput}
//           className="form-control"
//           id={id}
//           placeholder={placeholder}
//           required
//           onChange={onChange}
//         ></input>
//       </div>
//     </>
//   );
// }

// const Form = () => {
//   const { cart } = useContext(CartContext);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [emailConfirm, setEmailConfirm] = useState('');
//   const [orderId, setOrderId] = useState(null);
//   const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);

//   const onNameChange = (event) => {
//     setName(event.target.value);
//   };
//   const onPhoneChange = (event) => {
//     setPhone(event.target.value);
//   };
//   const onEmailChange = (event) => {
//     setEmail(event.target.value);
//   };
//   const onEmailConfirmChange = (event) => {
//     setEmailConfirm(event.target.value);
//   };

//   const clean = () => {
//     setName('');
//     setPhone('');
//     setEmail('');
//     setEmailConfirm('');
//   };

//   const updateDataFirebase = async () => {
//     const firestore = getFirestore();
//     const itemsToUpdate = firestore.collection('items').where('id', 'in', cart.map((i) => i.id));

//     const query = await itemsToUpdate.get();
//     const batch = firestore.batch();

//     const outOfStock = [];
//     query.docs.forEach((docSnapShot, idx) => {
//       if (docSnapShot.data().stock >= cart[idx].quantity) {
//         batch.update(docSnapShot.ref, {
//           stock: docSnapShot.data().stock - cart[idx].quantity,
//         });
//       } else {
//         outOfStock.push({ ...docSnapShot.data(), id: docSnapShot.id });
//       }
//     });

//     if (outOfStock.length === 0) {
//       await batch.commit();
//     }
//   };

//   const createOrder = async () => {
//     const firestore = getFirestore();
//     const orders = firestore.collection('orders');
//     const userInfo = { name, phone, email };
//     const items = cart.map((p) => ({
//       id: p.id,
//       name: p.name,
//       quantity: p.quantity,
//       subtotal: p.price * p.quantity,
//     }));

//     const totalPrice = cart.reduce((total, product) => total + product.quantity * product.price, 0);

//     const newOrder = {
//       userInfo,
//       items,
//       date: firebase.firestore.Timestamp.fromDate(new Date()),
//       total: totalPrice,
//     };

//     try {
//       const docRef = await orders.add(newOrder);
//       setOrderId(docRef.id);
//       clean();
//       setShowPurchaseDetails(true);
//       updateDataFirebase();
//     } catch (err) {
//       console.log('Ha ocurrido un error creando la orden de compra', err);
//     }
//   };
  
//   if (showPurchaseDetails) {
//     return (
//       <>
//         <div className="container">
//           <div className="py-5 text-center mt-5">
//             <h2>¡Gracias por tu compra!</h2>
//             <p>Tu compra se ha realizado con éxito.</p>
//             <p>El ID de tu compra es: {orderId}</p>
//             <Link className="btn btn-outline-primary m-3" to={`/`}>
//               <strong>Ir a comprar</strong>
//             </Link>
//           </div>
//         </div>
//       </>
//     );
//   }else {
//     return (
//       <div className="container">
//         <div className="text-center py-5 mt-5">
//         <h4 className="mt-5">
//             Completa con tus datos para confirmar la compra.
//           </h4>
//         </div>
//         <div className="row">
//           <div className="col-md-12">
//             <form
//               onSubmit={(event) => {
//               event.preventDefault();
//               createOrder();
//             }}
//             >
//               <div className="row g-3">
//                 <Field
//                   inputLabel="inputName"
//                   name="name"
//                   nameField="Nombre y Apellido"
//                   valueInput={name}
//                   style={{ paddingTop: "5px" }}
//                   type="text"
//                   id="inputName"
//                   onChange={onNameChange}
//                 />
//                 <Field
//                   inputLabel="inputPhone"
//                   name="phone"
//                   nameField="Teléfono"
//                   valueInput={phone}
//                   style={{ paddingTop: "10px" }}
//                   type="text"
//                   id="inputPhone"
//                   onChange={onPhoneChange}
//                 />
//                 <Field
//                   inputLabel="inputEmail"
//                   name="email"
//                   nameField="Email"
//                   valueInput={email}
//                   style={{ paddingTop: "10px" }}
//                   type="email"
//                   id="inputEmail"
//                   onChange={onEmailChange}
//                 />
//                 <Field
//                   inputLabel="inputConfirmEmail"
//                   name="email"
//                   nameField="Confirmar Email"
//                   valueInput={emailConfirm}
//                   style={{ paddingTop: "10px" }}
//                   type="email"
//                   id="inputConfirmEmail"
//                   onChange={onEmailConfirmChange}
//                 />
//               </div>
//               <button
//                 className="btn btn-outline-success btn-lg btn-block mt-5"
//                 type="submit"
//                 disabled={!name || !phone || !email || emailConfirm !== email}
//                 style={{ marginBottom: '30px' }}
//               >
//                 <strong>Confirmar</strong>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// export default Form;

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../contexts/cartContext';
import { getFirestore } from '../../firebase/index';
import "./Form.css";

function Field({ name, inputLabel, nameField, style, type, id, placeholder, valueInput, onChange }) {
  return (
    <>
      <div className="col-sm-6">
        <label htmlFor={inputLabel} name={name} className="form-label" style={style}>
          {nameField}
        </label>
        <input
          type={type}
          value={valueInput}
          className="form-control"
          id={id}
          placeholder={placeholder}
          required
          onChange={onChange}
        />
      </div>
    </>
  );
}

const Form = () => {
  const { cart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onEmailConfirmChange = (event) => {
    setEmailConfirm(event.target.value);
  };

  const clean = () => {
    setName('');
    setPhone('');
    setEmail('');
    setEmailConfirm('');
  };

  const updateDataFirebase = async () => {
    const firestore = getFirestore();
    const itemsToUpdate = firestore.collection('items').where('id', 'in', cart.map((i) => i.id));

    const query = await itemsToUpdate.get();
    const batch = firestore.batch();

    const outOfStock = [];
    query.docs.forEach((docSnapShot, idx) => {
      if (docSnapShot.data().stock >= cart[idx].quantity) {
        batch.update(docSnapShot.ref, {
          stock: docSnapShot.data().stock - cart[idx].quantity,
        });
      } else {
        outOfStock.push({ ...docSnapShot.data(), id: docSnapShot.id });
      }
    });

    if (outOfStock.length === 0) {
      await batch.commit();
    }
  };

  const createOrder = async () => {
    const firestore = getFirestore();
    const orders = firestore.collection('orders');
    const userInfo = { name, phone, email };
    const items = cart.map((p) => ({
      id: p.id,
      name: p.name,
      quantity: p.quantity,
      subtotal: p.price * p.quantity,
    }));

    const totalPrice = cart.reduce((total, product) => total + product.quantity * product.price, 0);

    const newOrder = {
      userInfo,
      items,
      date: firestore.Timestamp.fromDate(new Date()), // Use firestore.Timestamp instead of firebaseInstance.firestore.Timestamp
      total: totalPrice,
    };

    try {
      const docRef = await orders.add(newOrder);
      setOrderId(docRef.id);
      clean();
      setShowPurchaseDetails(true);
      updateDataFirebase();
    } catch (err) {
      console.log('Ha ocurrido un error creando la orden de compra', err);
    }
  };
  
  if (showPurchaseDetails) {
    return (
      <>
        <div className="container">
          <div className="py-5 text-center mt-5">
            <h2>¡Gracias por tu compra!</h2>
            <p>Tu compra se ha realizado con éxito.</p>
            <p>El ID de tu compra es: {orderId}</p>
            <Link className="btn btn-outline-primary m-3" to={`/`}>
              <strong>Ir a comprar</strong>
            </Link>
          </div>
        </div>
      </>
    );
  }else {
    return (
      <div className="container">
        <div className="text-center py-5 mt-5">
        <h4 className="mt-5">
            Completa con tus datos para confirmar la compra.
          </h4>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form
              onSubmit={(event) => {
              event.preventDefault();
              createOrder();
            }}
            >
              <div className="row g-3">
                <Field
                  inputLabel="inputName"
                  name="name"
                  nameField="Nombre y Apellido"
                  valueInput={name}
                  style={{ paddingTop: "5px" }}
                  type="text"
                  id="inputName"
                  onChange={onNameChange}
                />
                <Field
                  inputLabel="inputPhone"
                  name="phone"
                  nameField="Teléfono"
                  valueInput={phone}
                  style={{ paddingTop: "10px" }}
                  type="text"
                  id="inputPhone"
                  onChange={onPhoneChange}
                />
                <Field
                  inputLabel="inputEmail"
                  name="email"
                  nameField="Email"
                  valueInput={email}
                  style={{ paddingTop: "10px" }}
                  type="email"
                  id="inputEmail"
                  onChange={onEmailChange}
                />
                <Field
                  inputLabel="inputConfirmEmail"
                  name="email"
                  nameField="Confirmar Email"
                  valueInput={emailConfirm}
                  style={{ paddingTop: "10px" }}
                  type="email"
                  id="inputConfirmEmail"
                  onChange={onEmailConfirmChange}
                />
              </div>
              <button
                className="btn btn-outline-success btn-lg btn-block mt-5"
                type="submit"
                disabled={!name || !phone || !email || emailConfirm !== email}
                style={{ marginBottom: '30px' }}
              >
                <strong>Confirmar</strong>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Form;