import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";

function Project() {
  const { user, token } = useContext(AppContext);
  const [category, setCategory] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/categories/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setCategory(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching category", err));
  }, []);

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

  return (
    <div className="main">
      <h2>{category.name}</h2>
      <div>
        <button onClick={(e) => handleAddNote(e)}>Add note</button>
        <button onClick={(e) => handleSelect(e)}>Select note(s)</button>
      </div>
      <div>
        {notes.length === 0 ? null : notes.map(note => {
          return(
            <div>
              <div>{note.title}</div>
              <div>{note.content}</div>
            </div>
          )
        })}
    
      </div>
     <div>
       <p>Category settings</p>
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
