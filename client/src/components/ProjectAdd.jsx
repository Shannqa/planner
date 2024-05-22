import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";
// import styles from "../styles/Home.module.css";

function ProjectAdd() {
  const { user } = useContext(AppContext);
  const [name, setName] = useState("");

  function handleAddProject(e) {
    e.preventDefault();

    fetch("/api/project", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.success) {
          console.log(body);
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
      <form onSubmit={(e) => handleAddProject(e)}>
        <div>
          <label htmlFor="name">Project's name:</label>
          <input name="name" onChange={(e) => setName(e.target.value)} />
          <button type="submit">Add project</button>
        </div>
      </form>
    </div>
  );
}

export default ProjectAdd;
