import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import striptags from "striptags";

function NotesArchived() {
  const { user, token } = useContext(AppContext);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/notes/archived", {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!notes) {
    return <div>Error, no notes.</div>;
  }

  return (
    <div className="notes-all">
      <h2>All notes</h2>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
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
export default NotesArchived;
