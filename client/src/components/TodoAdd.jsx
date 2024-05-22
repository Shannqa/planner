import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";
// import styles from "../styles/Home.module.css";

function TodoAdd() {
  const { user } = useContext(AppContext);

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
    </div>
  );
}

export default TodoAdd;
