import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import Account from "./Account.jsx";
import Login from "./Login.jsx";
import HomeGuest from "./HomeGuest.jsx";
import Home from "./Home.jsx";

function Main() {
  const { user } = useContext(AppContext);

  if (user) {
    return <Home />;
  } else {
    return <HomeGuest />;
  }
}

export default Main;
