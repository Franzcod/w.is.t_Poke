# REDUX

```
agregar dependencias:

==> npm i react-redux redux redux-thunk
```

> Extencion de Redux DevTools:  
> https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es

---

---

## Estructura comun:

```
 /MyApp
   |
   ├──> /public
   |    └─> ...
   |
   ├──>/src
   |    |
   |    ├──> /components
   |    |      └─> componente_1.js
   |    |
   |    ├──> /reducers
   |    |      └─>productReducer.js
   |    |      └─>reducer.js
   |    |
   |    |
   |    ├──> /types
   |    |      └─>index.js
   |    |
   |    |
   |    ├──> /actions
   |    |      └─>productoActions.js
   |    |
   |    |
   |    ├──> /config
   |    |      └─> axios.js
   |    |
   |    |
   |    ├──> store.js
   |    ├──> App.js
   |    |
   |    |
   .    .
   .    .
```

<!-- ![Folders](./img/folders.jpg) -->

## El Store

### Es el encargado del ESTADO de TODA LA APLICACION COMPLETA

> UN STORE POR APLICACION, QUE FLUYE A TRAVES DEL PROVIDER

```javascript
//==>  store.js

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //Para usar funciones asincronas
```

## El Reducer

> -Cada parte de la app tiene su reducer con su state

> -Si tienes muchos reducers hay q pasarlos al Store con "combine reducer"

> -Saben que hacer con los accions.

> -Cada reducer tiene su State.

> -por ejemplo el reducer de Productos:

```javascript
//==>  reducers/productReducer.js
//
// Estado inicial
const initialState = {
  productos: [],
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

### El index en reducers:

> Se pueden hacer multiples reducers, e importarlos en index

```javascript
//==>  reducers/index.js

import { combineReducers } from "redux";
import productReducer from "./productReducer";

//combina los multiples reducer
export default combineReducers({
  productos: productosReducer,
});
```

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

### --> de nuevo en el Store

```javascript
//==>  store.js
//
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //Para usar funciones asincronas

//AGREGAMOS
// importamos los reducer en el store(como es index.js no hace falta ponerlo)
import reducer from "./reducers";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    //para las funcionalidades de Redux DevTools
    //si esta instalado funciona, y si no lo esta tmb
    typeof window === "object" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
```

---

En el App.js ==>

```javascript
//==> /App.js
(...)
.
.
import {Provider} from 'react-redux';
import store from './store.js';

//agregamos Provider con el store
//para que esten disponible las funciones en todo el proyecto
<Router>
  <Provider store={store}>
    //resto de la app
  </Provider>
<Router/>
.
.
.
(...)


```

---

## Types

### Los types describen "lo q pasa en la aplicacion"

### Lo vamos a usar tanto en las ACTIONS como en los REDUCER, PARA MODIFICAR EL STATE DEPENDIENDO DE LO QUE ESTE SUCEDIENDO

### Dentro de la carpeta SRC creamos la carpeta types

```javascript
// ==> types/index.js

export const AGREGAR_PRODUCTO = "AGREGAR_PRODUCTO";
export const AGREGAR_PRODUCTO_EXITO = "AGREGAR_PRODUCTO_EXITO";
export const AGREGAR_PRODUCTO_ERROR = "AGREGAR_PRODUCTO_ERROR";
```

### Ahora los importamos en "productosReducer.js:

```javascript
//==>  reducers/productReducer.js
//--------------------------------------------
// IMPORTAMOOS LOS TYPES
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";
//---------------------------------------------

// Estado inicial
const initialState = {
  productos: [],
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

## Actions

```javascript
// ==> actions/productoActions.js

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

// Crear nuevo producto
// accion de crear nuevo producto
export function crearNuevoProductoAction() {
  return () => {
    // si hacemos submit en el formulario del componente se ejecuta el console.log:
    // con la siguiente configuracion del componente (a continuacion)
    console.log("Desde Actions");
  };
}
```

### Dentro del componente importamos la accion

### Usamos DISPATCH para llamar a las funcioones que tenemos en las ACTIONS

```javascript
// ==> components/componente_1.js

import React from 'react';
// importamos!
import { useDispatch, useSelector} from 'react-redux';
//Actions de Redux
import {crearNuevoProductoAction } from '../actions/ProductoActions';

const NuevoProducto = () => {

  //Utilizar use Dispatch y tecrrea una funcion
  const dispatch = useDispatch();

  //Manda a llamar el action de producto Action
  const agregarProducto = () => dispatch( crearNuevoProductoAction() );

  //Cuando el usuario haga submit
  const submitNuevoProducto = e => {
    e.preventDefault();

    //Validar formulaiio
    //Si no hay errres
    //crear el nuevo producto
    agregarProducto()
  }


  return <div>
            <form onsubmit={submitNuevoProducto}>
            </form>
        </div>
}
.
.
(...)
```

### Hasta ahi el componente resive la accion correctamente, a continuacion le agregamos estado al mismo componente.

### Y le pasamos laas acciones a lo input del formulario

```javascript
// ==> components/componente_1.js


// importamos useState
import React from, {useState} 'react';
import { useDispatch, useSelector} from 'react-redux';
import {crearNuevoProductoAction } from '../actions/ProductoActions';

const NuevoProducto = () => {

  // State del componente
  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);

  const dispatch = useDispatch();

  const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );


  const submitNuevoProducto = e => {
    e.preventDefault();

    //Validar el formulario
    if(nombre.trim() === '' || precio <= 0){
      return;
    }

    agregarProducto({
      nombre,
      precio
    });
  }


  return <div>
            <form onsubmit={submitNuevoProducto}>

              <input
                type='text'
                className='form-control'
                placeholder='Nombre Producto'
                name='nombre'

                //le pasamos las acciones
                value={nombre}
                onchange={e => guardarNombre(e.target.value)}
              />

              <input
                type='text'
                className='form-control'
                placeholder='Nombre Producto'
                name='nombre'

                //le pasamos las acciones
                value={precio}
                onchange={e => guardarPrecio(Number(e.target.value))}
              />

              <button
                type='submit'
              >Agregar</button>

            </form>
        </div>
}
.
.
(...)
```

### Volvemos al Action y le ponemos el producto

```javascript
// ==> actions/productoActions.js

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

export function crearNuevoProductoAction(producto) {
  return () => {
    // Agregamos producto
    // se devveria consoleguear el producto al hacer submit
    console.log(producto);
  };
}
```

### Sabiendo q llega el producto pasamos el dispatch

```javascript
// ==> actions/productoActions.js

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

export function crearNuevoProductoAction(producto) {
  return (dispatch) => {
    dispatch(agregarProducto());
  };
}

// Agregamos el type de la accion
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
});
```

### lo Proximo seria poner el el REDUCTOR que tiene que hacer esa accion

```javascript
//==>  reducers/productReducer.js
//
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

// Estado inicial
const initialState = {
  productos: [],
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    // en caso de resivir esta accion, etc:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
```

### siguiente: en el accionProducto

```javascript
// ==> actions/productoActions.js

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

export function crearNuevoProductoAction(producto) {
  return (dispatch) => {
    dispatch(agregarProducto());

    // agregamos las funciones de succes y error
    try {
      dispatch(agregarProductoExito(producto));
    } catch (error) {
      dispatch(agregarProductoError(true));
    }
  };
}

// Agregamos el type de la accion
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

// Si se guarda bien
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

// Si se guarda bien
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});
```

### Pasamos las acciones al reductor

```javascript
//==>  reducers/productReducer.js
//
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

// Estado inicial
const initialState = {
  productos: [],
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: true,
      };
    // AGREAMO LAS DEMAS ACCIONES
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
      };

    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
```

---

---

# Para hacer peticiones a una API usamos AXIOS

## por lo cual, agregamos las dependencias de Axios

> Axios es un paquete para hacer promesas como Ajax (Esta mas piola)

```
npm i axios
```

## En axios.js

```javascript
import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:4000", //url de api
});

export default clienteAxios;
```

## En productAccion importamos axios

```javascript
// ==> actions/productoActions.js

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

// Importamos axios
import clienteAxios from "../config/axios";

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      // insertar en la API
      await clienteAxios.post("/productos", producto);

      //Si sale toddo bien actualizar el statement
      dispatch(agregarProductoExito(producto));
    } catch (error) {
      // Si hay un error cambiar el stae
      dispatch(agregarProductoError(true));
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});
```

---

### Como accedemmos al nuevo producto:

```javascript
// ==> components/componente_1.js


import React from, {useState} 'react';
import { useDispatch, useSelector} from 'react-redux';
import {crearNuevoProductoAction } from '../actions/ProductoActions';

const NuevoProducto = () => {

  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);

  const dispatch = useDispatch();


  // acceder al state del store
  const cargando = useSelector( (state) => state.productos.loading);
  //
  const error = useSelector(state => state.productos.error);

  const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );


  const submitNuevoProducto = e => {
    e.preventDefault();

    if(nombre.trim() === '' || precio <= 0){
      return;
    }

    agregarProducto({
      nombre,
      precio
    });
  }


  return <div>
            <form onsubmit={submitNuevoProducto}>

              <input
                type='text'
                className='form-control'
                placeholder='Nombre Producto'
                name='nombre'

                //le pasamos las acciones
                value={nombre}
                onchange={e => guardarNombre(e.target.value)}
              />

              <input
                type='text'
                className='form-control'
                placeholder='Nombre Producto'
                name='nombre'

                //le pasamos las acciones
                value={precio}
                onchange={e => guardarPrecio(Number(e.target.value))}
              />

              <button
                type='submit'
              >Agregar</button>

            </form>
            // Si el estado de cargando es true, se muestra, sino no.
            { cargando ? <p>Cargando...</p> : null}
            // //////////////////////////////
            {error ? <p>Error!!!!...</p> : null}
        </div>
}

export default NuevoProducto;
.
.
(...)
```

# EXTRA

## sweet_alert

> Libreria para alertas muy cheveres

```
npm i sweetalert2
```

```javascript
// ==> actions/productoActions.js

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

import clienteAxios from "../config/axios";
// importamos sweet alert
import Swal from "sweetalert2";

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      await clienteAxios.post("/productos", producto);

      dispatch(agregarProductoExito(producto));

      //Alerta
      Swal.fire("Correcto", "El producto se agrego correctamente", "success");
      //-----------------------
    } catch (error) {
      dispatch(agregarProductoError(true));

      // Alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Intenta de nuevo",
      });
      //-----------------------
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});
```

---

## Para q pase a la otra pagina cuando se carga un producto

```javascript
// ==> components/componente_1.js


import React from, {useState} 'react';
import { useDispatch, useSelector} from 'react-redux';
import {crearNuevoProductoAction } from '../actions/ProductoActions';

// agregamos el props history
const NuevoProducto = ({history}) => {

  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);

  const dispatch = useDispatch();


  const cargando = useSelector( (state) => state.productos.loading);

  const error = useSelector(state => state.productos.error);

  const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );


  const submitNuevoProducto = e => {
    e.preventDefault();

    if(nombre.trim() === '' || precio <= 0){
      return;
    }

    agregarProducto({
      nombre,
      precio
    });


    // Redireccionar a la paginaprincipal
    history.push('/');
  }


  return <div>
            <form onsubmit={submitNuevoProducto}>

              <input
                type='text'
                className='form-control'
                placeholder='Nombre Producto'
                name='nombre'

                //le pasamos las acciones
                value={nombre}
                onchange={e => guardarNombre(e.target.value)}
              />

              <input
                type='text'
                className='form-control'
                placeholder='Nombre Producto'
                name='nombre'

                //le pasamos las acciones
                value={precio}
                onchange={e => guardarPrecio(Number(e.target.value))}
              />

              <button
                type='submit'
              >Agregar</button>

            </form>
            // Si el estado de cargando es true, se muestra, sino no.
            { cargando ? <p>Cargando...</p> : null}
            // //////////////////////////////
            {error ? <p>Error!!!!...</p> : null}
        </div>
}

export default NuevoProducto;
.
.
(...)
```

# Fin

### Continua en el proximo...

### Veremos como mostar los productos en la pagina principal
