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
