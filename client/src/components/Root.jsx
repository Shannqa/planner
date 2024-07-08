import { useState, useEffect, createContext, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
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
        <Main />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default Root;
