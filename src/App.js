import "./App.css";
import { useEffect, useState } from "react";
import { Note } from "./Note";
import {
  create as createNote,
  getAll as getAllNotes,
} from "./services/notes/index";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    const noteToAdd = {
      title: newNote,
      body: newNote,
      userId: 1,
    };

    createNote(noteToAdd)
      .then((newNote) => {
        setNotes([...notes, newNote]);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    setNewNote("");
  };

  console.log("render");
  return (
    <div>
      <h1>NOTES</h1>
      {loading ? "Cargando..." : ""}
      <ol>
        {console.log(notes)}
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Create note</button>
      </form>
      {error ? <span style={{ color: "red" }}>{error}</span> : ""}
    </div>
  );
}
