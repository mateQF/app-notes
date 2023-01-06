import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const WarningNotUsed = () => {
  return <h1>Todavia no se ha usado el contador</h1>;
};

const ListOfClicks = ({ clicks }) => {
  return <p>Clicks totales: {clicks.length}</p>;
};

const App = () => {
  // const [left, setLeft] = useState(0);
  // const [right, setRight] = useState(0);

  //me ahorro un estado asi, igualmente la mejor forma es la de arriba
  const [counters, setCounters] = useState({
    //estoy guardando un objeto en un estado
    left: 0,
    right: 0,
    mensaje: "Mensaje desde estado",
  });

  //con un array
  const [clicks, setClicks] = useState([]);

  const handleClickLeft = () => {
    const newCountersState = {
      ...counters,
      left: counters.left + 1,
      // clicks: counters.clicks + 1
    };

    setCounters(newCountersState);
    setClicks((prevClicks) => {
      return [...prevClicks, "L"]; //al ser un array, tengo que
      //devolver un array
    });

    // setCounters({
    //esto nos guarda todo lo que ya tenemos en el counter
    //es para no sobreescribir todo lo que esta ahi arriba
    //y solo "machacar" la información que nosotros queremos
    // ...counters,
    // left: counters.left + 1,
    // right: counters.right, //este no tiene sentido dejarlo pq
    //ya viene de arriba, pero el left y los clicks si los cambiamos
    // clicks: counters.clicks + 1
    // });
  };

  const handleClickRight = () => {
    setCounters({
      ...counters,
      // left: counters.left,
      right: counters.right + 1,
      // clicks: counters.clicks + 1
      //aca me ahorro de poner mensaje: counters.mensaje
      //pq encima si no lo pongo y hago click en el boton de right
      //en la pagina, me elimina el mensaje pq aca no lo puse
      //por eso sirve demasiado el ...counters
    });
    setClicks((prevClicks) => {
      return [...prevClicks, "R"]; //al ser un array, tengo que
      //devolver un array
    });
  };

  const handleClickReset = () => {
    setCounters({
      left: 0,
      right: 0,
      mensaje: "Mensaje desde estado",
    });
    setClicks([]);
  };

  return (
    <div>
      {counters.left}
      <button onClick={handleClickLeft}>Left</button>
      <button onClick={handleClickRight}>Right</button>
      {counters.right}
      {/* <p>Clicks totales: {clicks.join(" - ")}</p> esta transformando el array en string */}
      {/* <p>Clicks totales: {clicks.length}</p> */}
      <br></br>
      <br></br>
      <button onClick={handleClickReset}>RESET</button>

      {/* RENDERIZADO CONDICIONAL */}
      {clicks.length === 0 ? (
        <WarningNotUsed />
      ) : (
        <ListOfClicks clicks={clicks} />
      )}

      {/* <p>{counters.mensaje}</p> */}
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
