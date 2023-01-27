import "./App.css";
import { useEffect, useState } from "react";
import { Note } from "./Note";
import {
  create as createNote,
  getAll as getAllNotes,
  update as updateNote,
  setToken,
} from "./services/notes";
import { login } from "./services/login";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser")
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
  }, [])

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();

    const noteToAdd = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    createNote(noteToAdd)
      .then((newNote) => {
        setNotes([...notes, newNote]);
        setNewNote("");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      setToken(user.token)

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError("Wrong credentials");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleLogOut = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  );

  const renderCreateNoteForm = () => (
    <>
      <form onSubmit={addNote}>
        <input
          type="text"
          onChange={handleChange}
          value={newNote}
          placeholder="Note content"
        />
        <button>Create note</button>
      </form>
      <button onClick={handleLogOut}>Logout</button>
    </>
  );

  return (
    <div>
      <h1>NOTES APP</h1>
      {user ? renderCreateNoteForm() : renderLoginForm()}
      <ol>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      {error ? <span style={{ color: "red" }}>{error}</span> : ""}
    </div>
  );
}
