import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";

function Todos() {
  const { user, token } = useContext(AppContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setTodos(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching todos", err));
  }, []);

  return (
    <div className="main">
      <h2>All todos</h2>
      <ul>
        <li>
          <Link to="/todos/add">Add todo</Link>
        </li>
        <li>
          <Link to="/projects/add">Add project</Link>
        </li>
      </ul>
      <div>
        {todos.map((todo) => {
          return (
            <Link to={`/todos/${todo._id}`} key={todo._id}>
              {todo.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Todos;
