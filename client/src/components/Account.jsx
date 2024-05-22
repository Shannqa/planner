import { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Link } from "react-router-dom";
import Logout from "./Logout.jsx";

function Account() {
  const { user, setUser } = useContext(AppContext);

  // add a post

  return (
    <div className="main">
      <p>Hello, {user}</p>
      <ul>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>

      <Logout />
    </div>
  );
}
export default Account;
