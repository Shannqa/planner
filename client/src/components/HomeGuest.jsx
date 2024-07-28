import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import { useLocation, Outlet, Navigate } from "react-router-dom";

// import styles from "../styles/Home.module.css";

function HomeGuest() {
  const { user } = useContext(AppContext);

  return (
    <div className="main">
      <Outlet />
    </div>
  );
}

export default HomeGuest;
