import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link, useNavigate } from "react-router-dom";

function CategoryAdd() {
  const { user, token } = useContext(AppContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleAddCategory(e) {
    e.preventDefault();

    fetch("/api/categories", {
      method: "POST",
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
          console.log(json);
          const categoryId = body.id;
          navigate(`/categoriees/${categoryId}`);
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
    <div className="category-add">
      <h2>Add category</h2>
      <form onSubmit={(e) => handleAddCategory(e)}>
        <div>
          <label htmlFor="name">Category's name:</label>
          <input name="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit">Add category</button>
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

export default CategoryAdd;
