import { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link } from "react-router-dom";
import Logout from "./Logout.jsx";

function Sidebar() {
  const { user, setUser, projects } = useContext(AppContext);

  // add a post

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/todos">All todos</Link>
        </li>
        <li>
          <Link to="/projects">All projects</Link>
        </li>
      </ul>

      <ul>
        <li>Projects:</li>
        {projects.map((project) => {
          return (
            <li key={project._id}>
              <Link to={`/projects/${project._id}`}>{project.name}</Link>
            </li>
          );
        })}
      </ul>

      <Logout />
    </div>
  );
}
export default Sidebar;
