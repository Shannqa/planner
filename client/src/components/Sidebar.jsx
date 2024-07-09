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
      <h2>Actions</h2>
      <ul>
        <li>
          <Link to="/notes/add">Add note</Link>
        </li>
        <li>
          <Link to="/categories/add">Add category</Link>
        </li>
      </ul>
      <h2>Categories</h2>
      <ul>
        <li>
          <Link to={"/notes/"}>All notes</Link>
        </li>
        {categories.map((category) => {
          return (
            <li key={category._id}>
              <Link to={`/categories/${category._id}`} key={category._id}>
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
