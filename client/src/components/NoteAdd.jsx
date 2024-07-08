import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link, useNavigate } from "react-router-dom";

function NoteAdd() {
  const { user, token, categories, setCategories } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

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
        category: category
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
  return (
    <div className="main">
      <form onSubmit={(e) => handleAddNote(e)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input name="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea name="content" onChange={(e) => setContent(e.target.value)} />
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
    </div>
  );
}

export default NoteAdd;
