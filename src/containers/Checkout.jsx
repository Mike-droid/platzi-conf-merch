import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import AppContext from '../context/AppContext';
import handleSumTotal from '../utils/sumTotal';
import '../styles/components/Checkout.css';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemove = (product, i) => () => {
    removeFromCart(product, i);
  }

  return (
    <>
    <Helmet>
      <title>Lista de pedidos - Platzi Conf Merch</title>
    </Helmet>
    <div className="Checkout">
      <div className="Checkout-content">
        {cart.length > 0 ? <h3>Lista de pedidos:</h3> : <h3>Sin pedidos</h3> }
        {
          cart.map((item, i) => (
            <div className="Checkout-element" key={item.title}>
              <div className="Checkout-element">
                <h4>{item.title}</h4>
                <span>{item.price}</span>
              </div>
              <button type="button" onClick={handleRemove(item, i)}>
                <i className="fas fa-trash-alt"/>
              </button>
            </div>
          ))
        }
        </div>
      {cart.length > 0 && (
        <div className="Checkout-sidebar">
          <h3>{`Precio Total: $ ${handleSumTotal(cart)}`}</h3>
          <Link to="checkout/information">
            <button type="button">Continuar pedido</button>
          </Link>
        </div>
      )}
    </div>
    </>
  );
}
export default Checkout;
