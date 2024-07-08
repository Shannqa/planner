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
    <div className="main">
      <ul>
        <li>
          <Link to="/notes/add">Add note</Link>
        </li>
        <li>
          <Link to="/categories/add">Add category</Link>
        </li>
      </ul>
      <h2>All categories</h2>
      <div>
        {categories.map((category) => {
          return (
            <Link to={`/categories/${category._id}`} key={category._id}>
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
