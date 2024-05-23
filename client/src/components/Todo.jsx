import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";

function Todo() {
  const { user, token } = useContext(AppContext);
  const [todo, setTodo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/todos/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setTodo(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching todo", err));
  }, []);

  function handleDeleteTodo() {
    fetch(`/api/todos/${id}`, {
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
          navigate("/todos/");
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

  function handleEditTodo(e) {
    e.preventDefault();

    fetch(`/api/todos/${id}`, {
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
          setTodo(body.todo);
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
      <h2>Todo</h2>
      <ul>
        <li>
          <Link to="/todos">Todos list</Link>
        </li>
        <li>
          <Link to="/todos/add">Add todo</Link>
        </li>
        <li>
          <Link to="/projects/add">Add project</Link>
        </li>
      </ul>
      <div>{todo ? todo.name : ""}</div>
      <button onClick={(e) => handleDeleteTodo()}>Delete todo</button>
      <button onClick={(e) => startEditing()}>Edit todo</button>

      {editing ? (
        <form onSubmit={(e) => handleEditTodo(e)}>
          <label htmlFor="name">Todo's name:</label>
          <input name="name" onChange={(e) => setName(e.target.value)} />
          <button type="submit">Change name</button>
        </form>
      ) : null}
    </div>
  );
}

export default Todo;
