import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link, useNavigate } from "react-router-dom";

function TodoAdd() {
  const { user, token } = useContext(AppContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleAddTodo(e) {
    e.preventDefault();

    fetch("/api/todos", {
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
          const todoId = body.id;
          navigate(`/todos/${todoId}`);
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
      <ul>
        <li>
          <Link to="/todo">Add todo</Link>
        </li>
        <li>
          <Link to="/project">Add project</Link>
        </li>
      </ul>
      <form onSubmit={(e) => handleAddTodo(e)}>
        <div>
          <label htmlFor="name">Todo's name:</label>
          <input name="name" onChange={(e) => setName(e.target.value)} />
          <button type="submit">Add todo</button>
        </div>
      </form>
    </div>
  );
}

export default TodoAdd;
