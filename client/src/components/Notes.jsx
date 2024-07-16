import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import striptags from "striptags";

function Notes() {
  const { user, token } = useContext(AppContext);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [selecting, setSelecting] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    fetch("/api/notes/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setNotes(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching note", err))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  function startSelecting() {
    setSelecting(true);
  }


function selectNotes(noteId) {
  if (selectedNotes.some(id => id === noteId)) {
    // deselect note
    setSelectedNotes(selectedNotes.filter(id => id !== noteId))
  } else {
    // select note
    setSelectedNotes(...selectedNotes, noteId)
  }
}

function handleSelectedNotes(action) {
  fetch("/api/notes/", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ids: selectedNotes,
        action: action
      })
    })
      .then((res) => res.json())
      .then((json) => {
        setNotes(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching note", err))
      .finally(() => {
        setLoading(false);
        setSelecting(false);
        setSelectedNotes([]);
      });
}

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!notes) {
    return <div>Error, no notes.</div>;
  }

  return (
    <div className="notes-all">
      <h2>All notes</h2>
        <div>
        <button onClick={(e) => handleAddNote(e)}>Add note</button>
        <button onClick={() => startSelecting()}>Select note(s)</button>
        {selecting && <div>
          <button onClick={() => handleSelectedNotes("delete")}>Delete note(s)</button>
          <button onClick={() => handleSelectedNotes("archive")}>Archive note(s)</button>
        </div>}
      </div>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
            {selecting && <input type="checkbox" onClick={() => selectNotes(note._id)}/>}
              <div>
                <h3>
                  <Link to={"/notes/" + note._id}>Title: {note.title}</Link>
                </h3>
                <div className="content">{striptags(note.content)}</div>
              </div>
              <div className="category">
                <Link to={"/categories/" + note.category._id}>
                  Category: {note.category.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Notes;
