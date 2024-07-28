import { useState, useEffect, createContext, useRef } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import HomeGuest from "./HomeGuest.jsx";
import Home from "./Home.jsx";
import Sidebar from "./Sidebar.jsx";
import "../styles/main.css";
import Login from "./Login.jsx";

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

  // verify access token on refreshing the page
  useEffect(() => {
    const storageToken = localStorage.getItem("accessToken");
    if (storageToken) {
      fetch("/api/auth/check", {
        method: "POST",
        headers: {
          Accept: "application/json",
          authorization: storageToken,
        },
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.success) {
            setUser(body.user);
            setToken(storageToken);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("not logged");
    }
  }, [token]);

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
