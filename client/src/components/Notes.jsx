import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";

function Notes() {
  const { user, token } = useContext(AppContext);
  const [notes, setNotes] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

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
      .catch((err) => console.log("Error fetching note", err));
  }, []);

  if (!notes) {
    return <div>Error, no notes.</div>;
  }

  return (
    <div className="notes">
      <h2>All notes</h2>
      {notes.map((note) => {
        return (
          <div key={note._id} className="note">
            <h3>
              <Link to={"/notes/" + note._id}>Title: {note.title}</Link>
            </h3>
            <div>Content: {note.content}</div>
            <div>
              <Link to={"/categories/" + note.category._id}>
                Category: {note.category.name}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Notes;
