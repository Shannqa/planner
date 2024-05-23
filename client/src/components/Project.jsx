import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";

function Projects() {
  const { user, token } = useContext(AppContext);
  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/projects/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setProject(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching project", err));
  }, []);

  function handleDeleteProject() {
    fetch(`/api/projects/${id}`, {
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
          navigate("/projects/");
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

  function handleEditProject(e) {
    e.preventDefault();

    fetch(`/api/projects/${id}`, {
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
          setProject(body.project);
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
      <ul>
        <li>
          <Link to="/todo">Add todo</Link>
        </li>
        <li>
          <Link to="/projects/add">Add project</Link>
        </li>
      </ul>
      <div>{project ? project.name : ""}</div>
      <button onClick={(e) => handleDeleteProject()}>Delete project</button>
      <button onClick={(e) => startEditing()}>Edit project</button>

      {editing ? (
        <form onSubmit={(e) => handleEditProject(e)}>
          <label htmlFor="name">Project's name:</label>
          <input name="name" onChange={(e) => setName(e.target.value)} />
          <button type="submit">Change name</button>
        </form>
      ) : null}
    </div>
  );
}

export default Projects;
