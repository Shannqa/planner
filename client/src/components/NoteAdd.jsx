import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "./Root.jsx";
import { Editor } from "@tinymce/tinymce-react";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";

function NoteAdd() {
  const { user, token, categories } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const parentCategory = useLocation().state;
  const TINY = process.env.API_KEY;

  useEffect(() => {
    if (parentCategory) {
      setCategory(parentCategory._id);
    }
  }, [parentCategory]);

  console.log(parentCategory);

  function handleAddNote(e) {
    e.preventDefault();

    let tinyContent = editorRef.current.getContent();

    fetch("/api/notes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: title,
        content: tinyContent,
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.success) {
          const noteId = body.id;
          navigate(`/notes/${noteId}`);
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

  return (
    <div className="note-add">
      <h2>Add note</h2>
      <form onSubmit={(e) => handleAddNote(e)}>
        <div className="title">
          <label htmlFor="title">Title:</label>
          <input name="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <Editor
            apiKey={TINY}
            onInit={(e, editor) => (editorRef.current = editor)}
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
}

export default NoteAdd;
