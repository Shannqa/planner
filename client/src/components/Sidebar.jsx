import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";

function Sidebar() {
  const { user, token, categories, setCategories } = useContext(AppContext);

  useEffect(() => {
    fetch("/api/categories/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
        console.log(json);
      })
      .catch((err) => console.log("Error fetching categories", err));
  }, []);

  return (
    <div className="sidebar">
      <ul>
        <li className="home">
          <Link to="/">Home</Link>
        </li>
        <li className="add-note">
          <Link to="/notes/add">Add note</Link>
        </li>
      </ul>
      <hr></hr>
      <ul className="categories-list">
        {categories.map((category) => {
          return (
            <li key={category._id}>
              <Link to={`/categories/${category._id}`} key={category._id}>
                {category.name}
              </Link>
            </li>
          );
        })}
        <li className="add">
          <Link to="/categories/add">Add category</Link>
        </li>
      </ul>
      <hr></hr>
      <ul>
        <li className="all">
          <Link to={"/notes/"}>All notes</Link>
        </li>
        <li className="deleted">
          <Link to={"/notes/deleted/"}>Deleted</Link>
        </li>
        <li className="archived">
          <Link to={"/notes/archived/"}>Archived</Link>
        </li>
      </ul>
      <hr></hr>
      <ul>
        <li className="settings">Settings</li>
        <li className="logout">
          <Link to={"/logout/"}>Log out</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
