import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";

function Projects() {
  const { user, token, projects, setProjects } = useContext(AppContext);

  useEffect(() => {
    fetch("/api/projects/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setProjects(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching projects", err));
  }, []);

  return (
    <div className="main">
      <h2>All projects</h2>
      <ul>
        <li>
          <Link to="/todos/add">Add todo</Link>
        </li>
        <li>
          <Link to="/projects/add">Add project</Link>
        </li>
      </ul>
      <div>
        {projects.map((project) => {
          return (
            <Link to={`/projects/${project._id}`} key={project._id}>
              {project.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
