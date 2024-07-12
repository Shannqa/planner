import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
import TINY from "./apiKey.js";

function Note() {
  const { user, token, categories } = useContext(AppContext);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();
  const editorRef = useRef(null);

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
        setTitle(json.title);
        setContent(json.content);
        setCategory(json.category);
      })
      .catch((err) => console.log("Error fetching note", err))
      .finally(() => {
        setLoading(false);
      });
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
    let tinyContent = editorRef.current.getContent();

    fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: title,
        content: tinyContent,
        category: category._id,
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

  function handleCancel() {
    navigate(-1);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Error, invalid note.</div>;
  }

  if (editing) {
    return (
      <div className="single-note-edit">
        <h2>Edit note</h2>
        <form onSubmit={(e) => handleEditNote(e)}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              name="title"
              className="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <Editor
              apiKey={TINY}
              onInit={(e, editor) => (editorRef.current = editor)}
              initialValue={note.content}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "anchor",
                  "visualblocks",
                  "insertdatetime",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks |" +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | removeformat",
              }}
            ></Editor>
          </div>
          <div className="category">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={category ? category._id : ""}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Choose a category</option>
              {categories.length !== 0 &&
                categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit">Save note</button>
          <button
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="single-note">
        <h2>Title: {note.title}</h2>
        <p>Content:</p>
        <div className="content">{parse(note.content)}</div>
        <p>
          <Link to={"/categories/" + note.category._id}>
            Category: {note.category.name}
          </Link>
        </p>

        <button onClick={(e) => handleDeleteNote()}>Delete note</button>
        <button onClick={(e) => startEditing()}>Edit note</button>
      </div>
    );
  }
}

export default Note;
