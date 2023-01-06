import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState } from 'react';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

//              props.number, props es un objeto, escribirlo asi es lo mismo
const Counter = ({number}) => {
  return <h1>{number}</h1>
};

const App = (props) => {
  //el use state es para renderizar solo una parte y no toda la aplicacion

  // const contador = useState(0); 
  
  //el use state es un hook (gancho) que ayuda a ponerle estado a un componente,
  //devuelve un array con dos elementos, el primero es el valor del elemento, y el segundo
  //es una funcion q permite cambiar el valor del elemento, le pasas un nuevo valor o una funcion que cambie el valor

  // const contadorValor = contador[0]; //valor
  // const updateContador = contador[1]; //funcion

  //pero se escribe asi
  const [contadorValor, updateContador] = useState(0);
  //aclaracion: lo mejor es siempre tener la minima cantidad de estados posibles
  //otra aclaracion es que los hooks no pueden ir en condicionales


  //nunca se usa setInterval ni setTimeout, es solo un ejemplo
  // setInterval(() => {
  //   updateContador(contadorValor + 1);
  // }, 1000)

  // function Incrementar(contadorValor){
  //   return contadorValor+1;
  // }
  const handleClick = () => {
    updateContador(contadorValor + 1);
  }
  const handleClickReset = () => {
    updateContador(0);
  }

  const isEven = contadorValor % 2 === 0;
  const mensaje = isEven ? 'El numero es par' : 'El numero es impar'; //renderizar en forma condicional
  console.log('render');

  //el use state hace que se vuelva a ejecutar/renderizar el cuerpo del componente
  //pero cuando? cuando se cambia el estado del componente y tambien cuando
  //le llegan props nuevas
  return (
    <div>
      <Counter number={contadorValor}></Counter>
      <small>{mensaje}</small>
      <br></br>
      <button onClick={handleClick} //va sin los ()
        // ()=>{
        // updateContador(Incrementar(contadorValor))
        // updateContador((contador) => {
        //   return contador + 1;
        // });
      /*}*/>Incrementar numero</button>
      <button onClick={handleClickReset}>
        Reset
      </button>
    </div>
  )
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
