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
path = require('path');
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
