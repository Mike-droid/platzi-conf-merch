import React, { useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Information.css';

const Information = () => {
  const { state, addToBuyer} = useContext(AppContext);
  const form = useRef(null);
  const history = useHistory();
  const { cart } = state;

  const handleSubmit = () => {
    const formData = new FormData(form.current);
    const buyer = {
      'name': formData.get('name'),
      'email': formData.get('email'),
      'address': formData.get('address'),
      'dpto': formData.get('dpto'),
      'country': formData.get('country'),
      'state' : formData.get('state'),
      'cp' : formData.get('cp'),
      'phone' : formData.get('phone'),
    }
    addToBuyer(buyer);
    history.push('/checkout/payment');
  }

  return (
    <div className="Information">
      <div className="Information-content">
        <div className="Information-head">
          <h2>Información de contacto:</h2>
        </div>
        <div className="Information-form">
          <form ref={form}>
            <label htmlFor="name">Nombre completo
              <input type="text" placeholder="Nombre completo" name="name" />
            </label>

            <label htmlFor="name">Correo electrónico
              <input type="text" placeholder="Correo electrónico" name="email" />
            </label>

            <label htmlFor="name">Dirección
              <input type="text" placeholder="Dirección" name="address" />
            </label>

            <label htmlFor="name">Ciudad
              <input type="text" placeholder="Ciudad" name="dpto" />
            </label>

            <label htmlFor="name">País
              <input type="text" placeholder="País" name="country" />
            </label>

            <label htmlFor="name">Estado
              <input type="text" placeholder="Estado" name="state" />
            </label>

            <label htmlFor="name">Código Postal
              <input type="text" placeholder="Código Postal" name="cp" />
            </label>

            <label htmlFor="name">Teléfono
              <input type="text" placeholder="Teléfono" name="phone" />
            </label>
          </form>
        </div>
        <div className="Information-buttons">
          <div className="Information-back">
            <Link to="/checkout">
              Regresar
            </Link>
          </div>
          <div className="Information-next">
            <button type="button" onClick={handleSubmit}>
              Pagar
            </button>
          </div>
        </div>
      </div>
      <div className="Information-sidebar">
        <h3>Pedido:</h3>
        { cart.map((item) => (
          <div className="Information-item" key={item.title}>
            <div className="Information-element">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
          </div>
        )) }

      </div>
    </div>
  );
}
export default Information;