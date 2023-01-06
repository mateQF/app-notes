import "./App.css";
import { useEffect, useState } from "react";
import { Note } from "./Note";
import {
  create as createNote,
  getAll as getAllNotes,
} from "./services/notes/index";

//los renderizados ocurren sin esperar, react no espera al fetch sino que renderiza otra vez cuando este listo
export default function App() {
  const [notes, setNotes] = useState([]); //el estado inicial es lo que le llega de las props
  const [newNote, setNewNote] = useState("");
  // const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //fetch devuelve una promesa, hacemos una peticion al sitio q le indicamos

  // fetch('https://jsonplaceholder.typicode.com/posts')
  // .then(response => response.json()) //una vez q tengas la respuesta transformala a json
  // .then(json => console.log(json))
  // .catch(err => console.log(err));
  //yo aca no puedo poner un setNewNote() pq me haria un loop infinito, para esto uso el useEffect que se ejecuta cada vez que se renderiza el componente
  //xq cada vez q se ejecuta el estado (setNewNote) se vuelve a renderizar el componente y vuelve a ejecutar el fetch y asi constantemente

  // useEffect(() => {
  //   console.log("Use effect");
  //   setLoading(true);
  //   setTimeout(() => {
  //     console.log("setTimeout");
  //     fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setNotes(json);
  //         console.log("seteando las notas de la API");
  //       })
  //       .catch((err) => console.log(err));
  //     setLoading(false);
  //   }, 2000);
  // }, [/*newNote*/]); //aca van las dependencias
  //este efecto depende de tal dependencia, en este caso newNote, o sea que cada vez q cambie la dependencia, se va a volver a cargar el useEffect
  //si pongo un [] quiere decir que se ejecuta solo la primera vez es decir que no tiene dependencias

  //con axios, una dependencia que es mejor que fetch
  useEffect(() => {
    setLoading(true);
    getAllNotes().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(newNote);

    const noteToAdd = {
      // id: notes.length + 1,
      title: newNote,
      body: newNote,
      // important: Math.random() < 0.5,
      userId: 1,
    };

    // setError("") //siempre hay que limpiar el estado
    createNote(noteToAdd)
      .then((newNote) => {
        setNotes([...notes, newNote]);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    // setNotes(notes.concat(noteToAdd)); //lo agrego asi pq en react los arrays no se pueden mutar
    //otra forma de agregar seria:
    //setNotes([...notes, noteToAdd]) con el spread operator (...)
    setNewNote(""); //limpiamos el campo del input (control del elemento)
  };

  // const handleShowAll = () => {
  //   setShowAll(() => !showAll);
  // };

  /* filter siempre devuelve un booleano si es true se muestra sino no*/

  console.log("render");
  // if (notes.length === 0) return "NO HAY NOTAS";
  return (
    <div>
      <h1>NOTES</h1>
      {loading ? "Cargando..." : ""}
      {/* <button onClick={handleShowAll}>
        {showAll ? "Show only important notes" : "Show all"}
      </button> */}
      <ol>
        {console.log(notes)}
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        {/* ponemos el value para el control del elemento*/}
        <button>Create note</button>
        {/* por defecto, el ultimo boton de un formulario es de tipo submit*/}
      </form>
      {error ? <span style={{ color: "red" }}>{error}</span> : ""}
    </div>
  );
}
