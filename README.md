# Platzi Conf Merch

## Configura un entorno de desarrollo profesional

### Proyecto: análisis y retos de Platzi Conf Store

Creamos una carpeta para el proyecto, dentro usamos `git init` y `npm init -y`. Luego instalamos `npm i react react-dom`.

Dentro de la carpeta src creamos el archivo index.js:

```js
import React from "react";
import ReactDOM from "react-dom";

import App from './components/App';

ReactDOM.render(<App/>, document.getElementById('app'));
```

Y en la carpeta components creamos el archivo App.jsx:

```jsx
import React from 'react'

const App = () => {
  return (
    <h1>
      Hola mundo
    </h1>
  )
}

export default App
```

Y también tenemos la carpeta public con el archivo index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Platzi Conf Merch</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### Instalación de Webpack y Babel: presets, plugins y loaders

Instalamos webpack: `npm install webpack webpack-cli webpack-dev-server --save-dev`

Instalamos plugins para que el proyecto se pueda mandar a producción: `npm i html-webpack-plugin html-loader --save-dev`

Instalamos babel para usar JS de mejor forma: `npm install babel-loader  @babel/preset-env @babel/preset-react @babel/core --save-dev`

### Configuración de Webpack 5 y webpack-dev-server

Creamos en la raíz de nuestro proyecto 2 archivos. webpack.config.js:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3005,
  }
};
```

y .babelrc:

```json
{
  "presets": [
    "@babel/preset-env", //* compila ES y ES6
    "@babel/preset-react" //* compila ES6 y sintaxís de React
  ]
}
```

En el archivo package.json añadimos 2 scripts:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack serve",
  "build": "webpack --mode production"
},
```

### Configuración de Webpack 5 con loaders y estilos

Instalamos los plugins: `npm install css-loader mini-css-extract-plugin --save-dev`

Añadimos en el archivo webpack.config.js una nueva regla:

```js
{
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader'
  ]
}
```

Y también un nuevo plugin:

```js
new MiniCssExtractPlugin({
  filename: 'assets/[name].css',
}),
```

Creamos una carpeta 'styles' y dentro una carpeta 'components' y dentro un archivo 'App.css':

```css
h1 {
  font-size: 3rem;
  color: blue;
}
```

Llamamos a este archivo en nuestro componente App.jsx:

```jsx
import React from 'react'
import '../styles/components/App.css';

const App = () => {
  return (
    <h1>
      Hola mundo
    </h1>
  )
}

export default App
```

### Loaders de Webpack para Preprocesadores CSS

[Artículo en Platzi](https://platzi.com/clases/2118-react-hooks/33488-loaders-de-webpack-para-preprocesadores-css/)

### Flujo de desarrollo seguro y consistente con ESLint y Prettier

Instalamos de forma global ESLint: `sudo npm i -g eslint`

Instalmos `npm i eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react`

Creamos en la raíz de nuestro proyecto el archivo .eslintrc:

```json
{
  "extends": [
    "airbnb",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "react/prop-types": 0,
    "no-underscore-dangle": 0,
    "import/imports-first": [
      "error",
      "absolute-first"
    ],
    "import/newline-after-import": "error"
  },
  "globals": {
    "window": true,
    "document": true,
    "localStorage": true,
    "FormData": true,
    "FileReader": true,
    "Blob": true,
    "navigator": true
  },
  "parser": "babel-eslint"
}
```

Instalamos: `npm i prettier eslint-plugin-prettier eslint-config-prettier`

Creamos un archivo en la raíz del proeyecto, .prettierrc:

```json
{
  "trailingComma": "es5",
  "semi": true,
  "singleQuote": true
}
```

Creamos nuevos scripts en el package.json:

```json
"format": "prettier --write '{*.js,src/**/*.{js,jsx}}'",
"lint": "eslint src/ --fix"
```

### Git Hooks con Husky

Husky es una herramienta que nos permite ejecutar Git Hooks de forma más amigable y sencilla con los cuales vamos a garantizar que se corren las pruebas pertinentes en nuestro código y de esta forma no enviar un bug o inconsistencias al repositorio del proyecto.

Instalamos con `npm install husky --save-dev`

Para integrar Husky a nuestro proyecto y garantizar que cada commit cumple con el estándar deseado debemos de agregar la integración dentro de nuestro archivo package.json:

```json
{
  "name": "platzi-conf-merch",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack serve",
    "build": "webpack --mode production",
    "format": "prettier --write '{*.js,src/**/*.{js,jsx}}'",
    "lint": "eslint src/ --fix"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-eslint": "^10.1.0",
    "eslint": "^7.32.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-import": "^2.23.4",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prettier": "^3.4.0",
    "eslint-plugin-react": "^7.24.0",
    "prettier": "^2.3.2",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@babel/core": "^7.15.0",
    "@babel/preset-env": "^7.15.0",
    "@babel/preset-react": "^7.14.5",
    "babel-loader": "^8.2.2",
    "css-loader": "^6.2.0",
    "html-loader": "^2.1.2",
    "html-webpack-plugin": "^5.3.2",
    "mini-css-extract-plugin": "^2.2.0",
    "webpack": "^5.49.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test"
    }
  }
}

```

Una vez agregada la configuración podemos estar seguros de que antes de agregar cada commit se ejecutarán estos hooks, los cuales validarán las pruebas necesarias que agreguemos a nuestro proyecto tenga un resultado positivo.

Si existe un error o las pruebas que incorporamos el proyecto no funcionan, en la consola podremos ver el resultado mostrando el error por el cual no se puede enviar el commit a nuestro repositorio.

## Estructura y creación de componentes para Platzi Conf Store

### Arquitectura de vistas y componentes con React Router DOM

Creamos la carpeta 'containers' para las vistas. Esto dentro de src. También una carpeta 'routes' que contiene el archivo de configuración de nuestras rutas.

Instalamos `npm i react-router-dom --save`

Dentro de routes, creamos el archivo 'App.jsx':

```jsx
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../containers/Home';
import Checkout from '../containers/Checkout';
import Information from '../containers/Information';
import Payments from '../containers/Payments';
import Success from '../containers/Success';
import NotFound from '../containers/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/checkout/information" component={Information} />
        <Route exact path="/checkout/payment" component={Payments} />
        <Route exact path="/checkout/success" component={Success} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```

Creamos un archivo de containers para cada una de las vistas y rutas, por ejemplo Home.jsx:

```jsx
import React from 'react'

const Home = () => {
  return (
    <h1>
      Home
    </h1>
  )
}

export default Home
```

Actualizamos index.js:

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './routes/App';

ReactDOM.render(<App />, document.getElementById('app'));

```

Y también actualizamos webpack.config.js:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3005,
  },
};

```

Nota: Cada vez que editamos los archivos de configuración como webpack debemos volver a correr el comando `npm start`

### Maquetación y estilos del home

[Estilos para descargar](https://arepa.s3.amazonaws.com/cursos-react-hooks-styles.zip)

Esos los metemos en la carpeta de styles/components y los mandamos a llamar en sus respectivos componentes.

### Maquetación y estilos de la lista de productos

Usaremos esta fake API simplemente para pruebas:

```js
export default {
  cart: [],
  products: [
    {
      'id': '1',
      'image': 'https://arepa.s3.amazonaws.com/camiseta.png',
      'title': 'Camiseta',
      'price': 25,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '3',
      'image': 'https://arepa.s3.amazonaws.com/mug.png',
      'title': 'Mug',
      'price': 10,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '4',
      'image': 'https://arepa.s3.amazonaws.com/pin.png',
      'title': 'Pin',
      'price': 4,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '5',
      'image': 'https://arepa.s3.amazonaws.com/stickers1.png',
      'title': 'Stickers',
      'price': 2,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '6',
      'image': 'https://arepa.s3.amazonaws.com/stickers2.png',
      'title': 'Stickers',
      'price': 2,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '7',
      'image': 'https://arepa.s3.amazonaws.com/hoodie.png',
      'title': 'Hoodie',
      'price': 35,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
  ],
};
```

Esta información estará en un archivo dentro de src con el nombre initialState.js.

En Home.jsx:

```jsx
import React from 'react';
import initialState from '../initialState'
import Products from '../components/Products';

const Home = () => (
  <Products products={initialState.products} />
)

export default Home;

```

Creamos Products.jsx dentro de components:

```jsx
import React from 'react'
import Product from './Product'
import '../styles/components/Products.css'

const Products = ({products}) => (
  <div className="Products">
    <div className="Products-items">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  </div>
  )

export default Products

```

Y también creamos Product.jsx:

```jsx
import React from 'react'

const Product = ({product}) => (
    <div className="Products-item">
      <img src={product.image}  alt={product.title}/>
      <div className="Product-item-info">
        <h2> {product.title}
          <span>$ {product.price}</span>
        </h2>
        <p>{product.description}</p>
      </div>
      <button type="button">Comprar</button>
    </div>
  )

export default Product

```

### Maquetación y estilos del formulario de checkout

Checkout.jsx:

```jsx
import React from 'react';
import '../styles/components/Checkout.css';

const Checkout = () => (
  <div className="Checkout">
    <div className="Checkout-content">
      <h3>Lista de pedidos:</h3>
      <div className="Checkout-element">
        <div className="Checkout-element">
          <h4>item name</h4>
          <span>$10</span>
        </div>
        <button type="button">Eliminar</button>
      </div>
    </div>
    <div className="Checkout-sidebar">
      <h3>Precio Total: $10</h3>
      <button type="button">Continuar pedido</button>
    </div>
  </div>
)

export default Checkout;

```

### Maquetación y estilos de la información del usuario

Information.jsx:

```jsx
import React from 'react';
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
          Pagar
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

```

### Maquetación y estilos del flujo de pago

Payment.jsx:

```jsx
import React from 'react';
import '../styles/components/Payment.css';

const Payment = () => (
  <div className="Payment">
    <div className="Payment-content">
      <h3>Resumen del pedido</h3>
      <div className="Paymeny-button">
        Boton de pago con Paypal
      </div>
    </div>
  </div>
)

export default Payment;

```

Success.jsx:

```jsx
import React from 'react';
import '../styles/components/Success.css';

const Success = () => (
  <div className="Success">
    <div className="Success-content">
      <h2>Miguel, gracias por tu compra</h2>
      <span>Tu pedido llegará en 3 días a tu dirección</span>
      <div className="Success-map">
        Google Maps
      </div>
    </div>
  </div>
)

export default Success;

```

### Integración de íconos y conexión con React Router

Usamos iconos de Font Awesome. Agregamos una etiqueta script en index.html, la cual es un toolkit que nos da la página en nuestro perfil.

Header.jsx:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.css';

const Header = () => (
  <header className="Header">
    <h1 className="Header-title">
      <Link to="/">
        PlatziConf Merch
      </Link>
    </h1>
    <div className="Header-checkout">
      <Link to="/checkout">
        <i className="fa fa-shopping-basket" aria-hidden="true"/>
      </Link>
    </div>
  </header>
);

export default Header;

```

Checkout.jsx:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Checkout.css';

const Checkout = () => (
  <div className="Checkout">
    <div className="Checkout-content">
      <h3>Lista de pedidos:</h3>
      <div className="Checkout-element">
        <div className="Checkout-element">
          <h4>item name</h4>
          <span>$10</span>
        </div>
        <button type="button">
          <i className="fas fa-trash-alt"/>
        </button>
      </div>
    </div>
    <div className="Checkout-sidebar">
      <h3>Precio Total: $10</h3>
      <Link to="checkout/information">
        <button type="button">Continuar pedido</button>
      </Link>
    </div>
  </div>
)

export default Checkout;

```

Information.jsx:

```jsx
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

```

## Intregación de React Hooks en Platzi Conf Merch

### Creando nuestro primer custom hook

Usaremos una API de React. Creamos la carpeta 'context' dentro de 'src' y dentro de ella creamos el archivo AppContext.js:

```js
import React from 'react';

const AppContext = React.createContext({});

export default AppContext;
```

Creamos la carpeta 'hooks' dentro de 'src' y dentro de ella creamos el archivo useInitialState.js:

```js
import { useState } from "react";
import initialState from '../initialState';

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = payload => {
    setState({
      ...state,
      cart: [...state.cart, payload]
    });
  };

  const removeFromCart = payload => {
    setState({
      ...state,
      cart: state.cart.filter(item => item.id !== payload.id)
    });
  };

  return {
    addToCart,
    removeFromCart,
    state
  };
};

export default useInitialState;
```

Y conectamos el hook y el estado a nuestra aplicación en App.jsx:

```jsx
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../containers/Home';
import Checkout from '../containers/Checkout';
import Information from '../containers/Information';
import Payments from '../containers/Payments';
import Success from '../containers/Success';
import NotFound from '../containers/NotFound';
import Layout from '../components/Layout';
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkout/information" component={Information} />
            <Route exact path="/checkout/payment" component={Payments} />
            <Route exact path="/checkout/success" component={Success} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  )
};

export default App;

```

### Implementando useContext en Platzi Conf Merch

Haremos que al presionar el botón de "comprar" el emoji de la canasta aumente de 1 en 1.

Header.jsx:

```jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Header.css';

const Header = () =>{
  const { state } = useContext(AppContext);
  const { cart } = state;

  return (
    <header className="Header">
      <h1 className="Header-title">
        <Link to="/">
          PlatziConf Merch
        </Link>
      </h1>
      <div className="Header-checkout">
        <Link to="/checkout">
          <i className="fa fa-shopping-basket" aria-hidden="true"/>
        </Link>
        {cart.length > 0 && <div className="Header-alert"> {cart.length} </div>}
      </div>
    </header>
  );
}
export default Header;

```

Products.jsx:

```jsx
import React, { useContext } from 'react';
import Product from './Product';
import AppContext from '../context/AppContext';
import '../styles/components/Products.css';

const Products = () => {
  const {state, addToCart} = useContext(AppContext);
  const { products } = state;

  const handleAddToCart = (product) => () => {
    addToCart(product)
  };

  return (
    <div className="Products">
      <div className="Products-items">
        {products.map(product => (
          <Product key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
export default Products

```

Product.jsx:

```jsx
import React from 'react'

const Product = ({product, handleAddToCart}) => (
    <div className="Products-item">
      <img src={product.image}  alt={product.title}/>
      <div className="Product-item-info">
        <h2> {product.title}
          <span>$ {product.price}</span>
        </h2>
        <p>{product.description}</p>
      </div>
      <button type="button"
        onClick={handleAddToCart(product)}>
          Comprar
      </button>
    </div>
  )

export default Product

```

App.jsx:

```jsx
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../containers/Home';
import Checkout from '../containers/Checkout';
import Information from '../containers/Information';
import Payments from '../containers/Payments';
import Success from '../containers/Success';
import NotFound from '../containers/NotFound';
import Layout from '../components/Layout';
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkout/information" component={Information} />
            <Route exact path="/checkout/payment" component={Payments} />
            <Route exact path="/checkout/success" component={Success} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;

```

### useContext en la página de checkout

Ahora veremos nuestro resumen de pedidos y este mostrará la suma de los precios y podemos eliminar
los productos de la lista.

Checkout.jsx:

```jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Checkout.css';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemove = (product, i) => () => {
    removeFromCart(product, i);
  }

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }

  return (
    <div className="Checkout">
      <div className="Checkout-content">
        {cart.length > 0 ? <h3>Lista de pedidos:</h3> : <h3>Sin pedidos</h3> }
        {
          cart.map((item, i) => (
            <div className="Checkout-element">
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
          <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
          <Link to="checkout/information">
            <button type="button">Continuar pedido</button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Checkout;

```

### useRef en la página de checkout

Ahora nuestra información se envía al checkout antes de pagar.

Actualizamos initialState.js:

```js
export default {
  cart: [],
  buyer: [],
  products: [
    {
      'id': '1',
      'image': 'https://arepa.s3.amazonaws.com/camiseta.png',
      'title': 'Camiseta',
      'price': 25,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '3',
      'image': 'https://arepa.s3.amazonaws.com/mug.png',
      'title': 'Mug',
      'price': 10,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '4',
      'image': 'https://arepa.s3.amazonaws.com/pin.png',
      'title': 'Pin',
      'price': 4,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '5',
      'image': 'https://arepa.s3.amazonaws.com/stickers1.png',
      'title': 'Stickers',
      'price': 2,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '6',
      'image': 'https://arepa.s3.amazonaws.com/stickers2.png',
      'title': 'Stickers',
      'price': 2,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '7',
      'image': 'https://arepa.s3.amazonaws.com/hoodie.png',
      'title': 'Hoodie',
      'price': 35,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
  ],
};
```

initialState.js:

```js
import { useState } from "react";
import initialState from '../initialState';

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = payload => {
    setState({
      ...state,
      cart: [...state.cart, payload]
    });
  };

  const removeFromCart = (payload, indexToRemove) => {
    setState({
      ...state,
      cart: state.cart.filter((_item, currentIndex) => currentIndex !== indexToRemove)
    });
  };

  const addToBuyer = payload => {
    setState({
      ...state,
      buyer: [...state.buyer, payload]
    })
  }

  return {
    addToCart,
    removeFromCart,
    addToBuyer,
    state
  };
};

export default useInitialState;
```

Information.jsx:

```jsx
import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Information.css';

const Information = () => {
  const { state, addToBuyer} = useContext(AppContext);
  const form = useRef(null);

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
```

### Integrando third party custom hooks en Platzi Conf Merch

Usamos history para hacer push.

Information.jsx:

```jsx
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
```

## Configura mapas y pagos con PayPal y Google Maps

### Paso a paso para conectar tu aplicación con la API de PayPal

[Artículo en Platzi](https://platzi.com/clases/2118-react-hooks/33506-paso-a-paso-para-conectar-tu-aplicacion-con-la-api/)

### Integración de pagos con la API de PayPal

Instalamos `npm i react-paypal-button-v2 --save`

Modificamos initialState.js:

```js
export default {
  cart: [],
  buyer: [],
  orders: [],
  products: [
    {
      'id': '1',
      'image': 'https://arepa.s3.amazonaws.com/camiseta.png',
      'title': 'Camiseta',
      'price': 25,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '3',
      'image': 'https://arepa.s3.amazonaws.com/mug.png',
      'title': 'Mug',
      'price': 10,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '4',
      'image': 'https://arepa.s3.amazonaws.com/pin.png',
      'title': 'Pin',
      'price': 4,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '5',
      'image': 'https://arepa.s3.amazonaws.com/stickers1.png',
      'title': 'Stickers',
      'price': 2,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '6',
      'image': 'https://arepa.s3.amazonaws.com/stickers2.png',
      'title': 'Stickers',
      'price': 2,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      'id': '7',
      'image': 'https://arepa.s3.amazonaws.com/hoodie.png',
      'title': 'Hoodie',
      'price': 35,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
  ],
};
```

Modificamos useInitialState.js:

```js
import { useState } from "react";
import initialState from '../initialState';

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = payload => {
    setState({
      ...state,
      cart: [...state.cart, payload]
    });
  };

  const removeFromCart = (payload, indexToRemove) => {
    setState({
      ...state,
      cart: state.cart.filter((_item, currentIndex) => currentIndex !== indexToRemove)
    });
  };

  const addToBuyer = payload => {
    setState({
      ...state,
      buyer: [...state.buyer, payload]
    })
  }

  const addNewOrder = payload => {
    setState({
      ...state,
      orders: [...state.orders, payload]
    });
  }

  return {
    addToCart,
    removeFromCart,
    addToBuyer,
    addNewOrder,
    state
  };
};

export default useInitialState;
```

Creamos la carpeta 'utils' dentro de 'src' y un archivo llamado 'sumTotal.js':

```js
const handleSumTotal = (cart) => {
  const reducer = (accumulator, current) => accumulator + current.price;
  const sum = cart.reduce(reducer, 0);
  return sum;
}

export default handleSumTotal;
```

Checkout.jsx:

```js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="Checkout">
      <div className="Checkout-content">
        {cart.length > 0 ? <h3>Lista de pedidos:</h3> : <h3>Sin pedidos</h3> }
        {
          cart.map((item, i) => (
            <div className="Checkout-element">
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
          <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
          <Link to="checkout/information">
            <button type="button">Continuar pedido</button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Checkout;

```

Payments.jsx:

```jsx
import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';
import handleSumTotal from '../utils/sumTotal';
import '../styles/components/Payment.css';

const Payment = ({history}) => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const paypalOptions = {
    clientID: 'XDXDXD',
    intent: 'capture',
    currency: 'USD',
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  }

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      history.push('/checkout/success');
    }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Paymeny-button">
          <PayPalButton
            paypayOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal(cart)}
            onPaymentStart={() => console.log('Start payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.error(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  )
}

export default Payment;

```

### Completando la integración de pagos con la API de PayPal

Por prácticas de seguridad, vamos a usar .env para los datos de la API de PayPal.

Instalamos `npm install --save-dev dotenv-webpack`

Lo agregamos a webpack.config.js:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new Dotenv()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3005,
  },
};

```

Creamos el archivo .env en la raíz de nuestro proyecto:

`CLIENT_ID = jejejeje`

Creamos una carpeta config dentro de src y el archivo index.js:

```js
const config = {
  // Environments
  clientIDPaypal: String(process.env.PAYPAL_CLIENT_ID)
}

export default config
```

Lo llevamos a Payments.jsx:

```jsx
import config from '../config';

const paypalOptions = {
    clientID: config.paypal.clientID,
    intent: 'capture',
    currency: 'USD',
  }
```

### Paso a paso para conectar tu aplicación con la API de Google Maps

[Artículo en Platzi](https://platzi.com/clases/2118-react-hooks/33651-paso-a-paso-para-conectar-tu-aplicacion-con-la-api/)

### Integración de Google Maps en el mapa de checkout

Instalamos `npm i @react-google-maps/api --save`

Agregamos la Google API Key a las variables de entorno

`GOOGLE_MAP_API_KEY = jeje`

En el archivo index.js de la carpeta config:

```js
const config = {
  // Environments
  clientIDPaypal: String(process.env.PAYPAL_CLIENT_ID),
  google_map_api_key: String(process.env.GOOGLE_MAP_API_KEY),
}

export default config
```

Payments.jsx:

```jsx
import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import config from '../config';
import AppContext from '../context/AppContext';
import handleSumTotal from '../utils/sumTotal';
import '../styles/components/Payment.css';

const Payment = ({history}) => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const paypalOptions = {
    clientID: config.clientIDPaypal,
    intent: 'capture',
    currency: 'USD',
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  }

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      history.push('/checkout/success');
    }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Paymeny-button">
          <PayPalButton
            paypayOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal(cart)}
            onPaymentStart={() => console.log('Start payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.error(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  )
}

export default Payment;

```

Success.jsx:

```jsx
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Map from '../components/Map';
import '../styles/components/Success.css';

const Success = () => {
  const { state } = useContext(AppContext);
  const { buyer } = state;
  return (
    <div className="Success">
      <div className="Success-content">
        <h2>{`${buyer.name}, gracias por tu compra`}</h2>
        <span>Tu pedido llegará en 3 días a tu dirección</span>
        <div className="Success-map">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Success;

```

Map.jsx:

```jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import config from '../config';

export const Map = () => {
  const mapStyle = {
    height: '50vh',
    width: '100%',
  }

  const defaultCenter = {
    lat: 19.426761,
    lng: -99.1718796,
  }

  return (
    <LoadScript googleMapsApiKey={config.google_map_api_key}>
      <GoogleMap
        MapStyle={mapStyle}
        mapContainerStyle={mapStyle}
        zoom={9}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
```

### Creando un Custom Hook para Google Maps

Instalamos `npm i axios --save`

Creamos un nuevo hook: useGoogleAddress.js:

```js
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const useGoogleAddress = address => {
  const [map, setMap] = useState({});

  const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.google_map_api_key}`

  useEffect(async() => {
    const response = await axios.get(API);
    setMap(response.data.results[0].geometry.location);
  }, []);
  return map;
}

export default useGoogleAddress;
```

Payment.jsx:

```jsx
import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import config from '../config';
import AppContext from '../context/AppContext';
import handleSumTotal from '../utils/sumTotal';
import '../styles/components/Payment.css';

const Payment = ({history}) => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const paypalOptions = {
    clientID: config.clientIDPaypal,
    intent: 'capture',
    currency: 'USD',
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  }

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      history.push('/checkout/success');
    }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Paymeny-button">
          <PayPalButton
            paypayOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal(cart)}
            onPaymentStart={() => console.log('Start payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.error(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  )
}

export default Payment;

```

Success.jsx:

```jsx
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Map from '../components/Map';
import useGoogleAddress from '../hooks/useGoogleAddress';
import '../styles/components/Success.css';

const Success = () => {
  const { state } = useContext(AppContext);
  const { buyer } = state;
  const { location } = useGoogleAddress(buyer[0].address);

  return (
    <div className="Success">
      <div className="Success-content">
        <h2>{`${buyer.name}, gracias por tu compra`}</h2>
        <span>Tu pedido llegará en 3 días a tu dirección</span>
        <div className="Success-map">
          <Map data={location} />
        </div>
      </div>
    </div>
  );
}

export default Success;

```

Map.jsx:

```jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import config from '../config';

export const Map = ({data}) => {
  const mapStyle = {
    height: '50vh',
    width: '100%',
  }

  const defaultCenter = {
    lat: data.lat,
    lng: data.lng,
  }

  return (
    <LoadScript googleMapsApiKey={config.google_map_api_key}>
      <GoogleMap
        MapStyle={mapStyle}
        mapContainerStyle={mapStyle}
        zoom={9}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
```

## Estrategias de deployment profesional

### Continuous integration y continuous delivery con GitHub Actions
