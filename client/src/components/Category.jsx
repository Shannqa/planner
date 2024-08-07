import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import striptags from "striptags";
import AddNote from "./AddNote.jsx";
import Notes from "./Notes.jsx";

function Category() {
  const { user, token, categories } = useContext(AppContext);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const id = useParams().id;
  const currentCategory = categories.find((cat) => cat._id === id);
  console.log(id);
  // if (currentCategory) {
  //   console.log(currentCategory);
  //   setName(currentCategory.name);
  // }
  // setName(currentCategory.name);

  // setCurrentCategory(categories.find((cat) => cat._id === id));
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`/api/categories/${id}`, {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setNotes(json);
  //       console.log(json);
  //     })
  //     .catch((err) => console.log("Error fetching category", err))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [id]);

  function handleDeleteCategory() {
    fetch(`/api/categories/${id}`, {
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
          navigate("/categories/");
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

  function handleEditCategory(e) {
    e.preventDefault();

    fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.success) {
          console.log(body);
          setCategory(body.category);
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

  function handleAddNote(e) {
    navigate("/notes/add/", { state: currentCategory });
  }

  return (
    <div className="category">
      <div>
        <AddNote />
        <h2>{currentCategory && "Category: " + currentCategory.name}</h2>
        <Notes view={"category"} categoryId={id} />
      </div>
      <div className="category-settings">
        <h2>Category settings</h2>
        <button onClick={(e) => handleDeleteCategory()}>Delete category</button>
        <button onClick={(e) => startEditing()}>Rename category</button>
      </div>

      {editing ? (
        <form onSubmit={(e) => handleEditCategory(e)}>
          <label htmlFor="name">Category's name:</label>
          <input name="name" onChange={(e) => setName(e.target.value)} />
          <button type="submit">Change name</button>
        </form>
      ) : null}
    </div>
  );
}

export default Category;
