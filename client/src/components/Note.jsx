import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";

function Note() {
  const { user, token } = useContext(AppContext);
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/notes/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setNote(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching note", err));
  }, []);

  function handleDeleteNote() {
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.success) {
          console.log(body);
          navigate("/notes/");
        } else {
          // there are errors
          console.log(body);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function startEditing(e) {
    setEditing(true);
  }

  function handleEditNote(e) {
    e.preventDefault();

    fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.success) {
          console.log(body);
          setNote(body.note);
          setEditing(false);
        } else {
          // there are errors
          console.log(body);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!note) {
    return <div>Error, invalid note.</div>;
  }

  return (
    <div className="main">
      <h2>Title: {note.title}</h2>
      <p>Content: {note.content}</p>
      <p>
        <Link to={"/categories/" + note.category._id}>
          Category: {note.category.name}
        </Link>
      </p>

      <button onClick={(e) => handleDeleteNote()}>Delete note</button>
      <button onClick={(e) => startEditing()}>Edit note</button>

      {editing ? (
        <form onSubmit={(e) => handleEditTodo(e)}>
          <label htmlFor="title">Title:</label>
          <input name="title" onChange={(e) => setTitle(e.target.value)} />

          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              name="content"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select name="category">
              <option value="">Choose a category</option>
              {categories.length !== 0 &&
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit">Add note</button>
        </form>
      ) : null}
    </div>
  );
}

export default Note;
