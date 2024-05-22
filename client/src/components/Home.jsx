import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
// import styles from "../styles/Home.module.css";

function Home() {
  const { user } = useContext(AppContext);

  return <div className="main">{user ? <Account /> : <Login />}</div>;
}

export default Home;
