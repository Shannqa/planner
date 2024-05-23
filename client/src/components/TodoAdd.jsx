import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link, useNavigate } from "react-router-dom";

function TodoAdd() {
  const { user, token, projects, setProjects } = useContext(AppContext);
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
        </div>
        <div>
          <label htmlFor="project">Project:</label>
          <select name="project">
            <option value="">Choose a project</option>
            {projects.length !== 0 &&
              projects.map((project) => (
                <option value={project._id} key={project._id}>
                  {project.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Add todo</button>
      </form>
    </div>
  );
}

export default TodoAdd;
