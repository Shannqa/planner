import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import striptags from "striptags";
import NotesActionButtons from "./NotesActionButtons.jsx";

function Notes({ view, categoryId }) {
  const { user, token } = useContext(AppContext);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [selecting, setSelecting] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);

  let fetchUrl = "/api/notes/";

  if (view === "active") {
    fetchUrl = "/api/notes/";
  } else if (view === "archived") {
    fetchUrl = "/api/notes/archived";
  } else if (view === "deleted") {
    fetchUrl = "/api/notes/deleted";
  } else if (view === "category") {
    fetchUrl = `/api/categories/${categoryId}`;
  } else {
    fetchUrl = "/api/notes/";
  }
  useEffect(() => {
    fetch(fetchUrl, {
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
  }, [fetchUrl]);

  function handleAddNote() {
    navigate("/notes/add");
  }

  function startSelecting() {
    if (selecting) {
      setSelecting(false);
      setSelectedNotes([]);
      return;
    }
    setSelecting(true);
  }

  function selectNotes(noteId) {
    if (selectedNotes.some((id) => id === noteId)) {
      // deselect note
      setSelectedNotes(selectedNotes.filter((id) => id !== noteId));
    } else {
      // select note
      setSelectedNotes([...selectedNotes, noteId]);
    }
  }

  function handleSelectedNotes(action) {
    let fetchMethod;
    if (action === "deletePerm") {
      fetchMethod = "DELETE";
    } else {
      fetchMethod = "PATCH";
    }

    fetch("/api/notes/", {
      method: fetchMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ids: selectedNotes,
        action: action,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        let remainingNotes = notes.filter((note) => !json.includes(note._id));

        console.log("remaining", remainingNotes);
        setNotes(remainingNotes);
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

  if (notes.length === 0) {
    return <div>No notes.</div>;
  }

  return (
    <>
      <div className="buttons">
        {(view === "active" || view === "category") && (
          <button onClick={() => handleAddNote()}>Add note</button>
        )}
        <button onClick={() => startSelecting()}>Select notes</button>
        {selecting && (
          <NotesActionButtons view={view} handler={handleSelectedNotes} />
        )}
      </div>
      <div className="notes">
        {notes.map((note) =>
          selecting ? (
            <div key={note._id} className="note select">
              <input
                type="checkbox"
                onClick={() => selectNotes(note._id)}
                className="note-select"
              />
              <div>
                <h3 className="title">{note.title}</h3>
                <div className="content">{striptags(note.content)}</div>
              </div>
              <div className="category">Category: {note.category.name}</div>
            </div>
          ) : (
            <Link
              to={"/notes/" + note._id}
              className="note-link"
              key={note._id}
            >
              <div key={note._id} className="note deselect">
                <div>
                  <h3 className="title">{note.title}</h3>
                  <div className="content">{striptags(note.content)}</div>
                </div>
                <div className="category">Category: {note.category.name}</div>
              </div>
            </Link>
          )
        )}
      </div>
    </>
  );
}
export default Notes;
