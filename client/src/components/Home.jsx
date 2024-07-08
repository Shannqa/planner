import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import Sidebar from "./Sidebar.jsx";

function Home() {
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
    <div className="home">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Home;
