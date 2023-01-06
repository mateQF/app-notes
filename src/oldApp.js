import "./App.css";
import { Note } from "./Note";

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
    categories: ['sport', 'thriller']
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

//podria pasarle el ({ note }) pero es buena practica pasar la cantidad justa de props y no cantidad de más
// const Note = ({ content, date }) => {
//   return (
//     <li >
//       <p>{content}</p>
//       <small>
//         <strong>
//           <time>{date}</time>
//         </strong>
//       </small>
//       <hr />
//     </li>
//   );
// };

function App() {
  if (typeof notes === "undefined" || notes.length === 0) {
    return "No hay notas que renderizar";
  }
  return (
    <ul>
      {/* {notes} ESTO NO SE PUEDE HACER,
            NO PODES RENDERIZAR UN OBJETO*/}
      {/* NO LO PUEDO HACER CON FOR EACH PQ NO DEVUELVE NADA
            LO TENGO QUE HACER CON MAP PORQUE PERMITE
            DEVOLVER EL OBJETO DE LA COLECCION */}
            { /* LA KEY VA SIEMPRE EN EL LUGAR QUE ESTOY ITERANDO
            NO LA PUEDO PONER EN EL 'LI' DEL COMPONENTE NOTE*/}
        {/* tambien le puedo pasar las props asi {...note}*/}
      {notes.map((note) => ( <Note key={note.id} id={note.id} content={note.content} date={note.date}/>
        // Las keys ayudan a React a identificar que ítems han cambiado, son agregados, o son eliminados. Las keys deben ser dadas a los elementos dentro del array para darle a los elementos una identidad estable
        // <li key={note.id}>
        //   {" "}
        //   {/* la key va siempre y tiene que tener un identificador unico, es mala practica poner math.random o el index del map (aunque se puede usar como ultimo recurso), se puede poner cualquier cosa: strings numeros o lo que sea*/}
        //   <p>{note.content}</p>
        //   <small>
        //     <strong>
        //       <time>{note.date}</time>
        //     </strong>
        //   </small>
        //   <hr />
        // </li>
      ))}
      {/* ASI SE RENDERIZA UNA COLECCION EN REACT,
            CON MAP */}
    </ul>
  );
}

export default App;
