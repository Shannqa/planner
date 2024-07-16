import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import striptags from "striptags";
import NotesActionButtons from "./NotesActionButtons.jsx";

function Notes({ view }) {
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
  }, []);

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

  return (
    <>
      <div>
        <button onClick={(e) => handleAddNote(e)}>Add note</button>
        <button onClick={() => startSelecting()}>Select notes</button>
        {selecting && (
          <NotesActionButtons view={view} handler={handleSelectedNotes} />
        )}
      </div>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
              {selecting && (
                <input type="checkbox" onClick={() => selectNotes(note._id)} />
              )}
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
    </>
  );
}
export default Notes;
