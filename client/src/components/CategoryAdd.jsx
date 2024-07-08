import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link, useNavigate } from "react-router-dom";

function ProjectAdd() {
  const { user, token } = useContext(AppContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleAddCategory(e) {
    e.preventDefault();

    fetch("/api/category", {
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

  return (
    <div className="main">
      <form onSubmit={(e) => handleAddCategory(e)}>
        <div>
          <label htmlFor="name">Category's name:</label>
          <input name="name" onChange={(e) => setName(e.target.value)} />
          <button type="submit">Add category</button>
        </div>
      </form>
    </div>
  );
}

export default CategoryAdd;
