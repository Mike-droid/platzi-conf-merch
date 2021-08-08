import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Information.css';

const Information = () => (
  <div className="Information">
    <div className="Information-content">
      <div className="Information-head">
        <h2>Información de contacto:</h2>
      </div>
      <div className="Information-form">
        <form action="">
          <label htmlFor="name">Nombre completo
            <input type="text" placeholder="Nombre completo" name="name" />
          </label>

          <label htmlFor="name">Correo electrónico
            <input type="text" placeholder="Correo electrónico" name="email" />
          </label>

          <label htmlFor="name">Dirección
            <input type="text" placeholder="Dirección" name="address" />
          </label>

          <label htmlFor="name">Departamento
            <input type="text" placeholder="Departamento" name="dpto" />
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
          Regresar
        </div>
        <div className="Information-next">
          <Link to="/checkout/payment">
            Pagar
          </Link>
        </div>
      </div>
    </div>
    <div className="Information-sidebar">
      <h3>Pedido:</h3>
      <div className="Information-item">
        <div className="Information-element">
          <h4>Item name</h4>
          <span>$10</span>
        </div>
      </div>
    </div>
  </div>
)

export default Information;
