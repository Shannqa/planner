import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";

function NoteAdd() {
  const { user, token, categories } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const parentCategory = useLocation().state;

  useEffect(() => {
    if (parentCategory) {
      setCategory(parentCategory._id);
    }
  }, [parentCategory]);

  console.log(parentCategory);

  function handleAddNote(e) {
    e.preventDefault();

    fetch("/api/notes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: title,
        content: content,
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
        <div>
          <label htmlFor="title">Title:</label>
          <input name="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={parentCategory ? parentCategory._id : ""}
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
