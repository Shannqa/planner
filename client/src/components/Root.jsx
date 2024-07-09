import { useState, useEffect, createContext, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import HomeGuest from "./HomeGuest.jsx";
import Home from "./Home.jsx";
import Sidebar from "./Sidebar.jsx";
import "../styles/main.css";

export const AppContext = createContext({
  user: "",
  setUser: () => {},
  token: "",
  setToken: () => {},
  categories: [],
  setCategories: () => {},
});

function Root() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        categories,
        setCategories,
      }}
    >
      <div className="root">
        <Header />
        {/* {error && <ErrorModal message={error} />} */}
        {user ? (
          <div className="root-home">
            <Sidebar />
            <Outlet />
          </div>
        ) : (
          <HomeGuest />
        )}
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default Root;
