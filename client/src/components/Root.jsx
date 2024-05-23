import { useState, useEffect, createContext, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "../styles/main.css";
// import ErrorModal from "./ErrorModal.jsx";

export const AppContext = createContext({
  user: "",
  setUser: () => {},
  token: "",
  setToken: () => {},
  projects: [],
  setProjects: () => {},
});

function Root() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // // verify token on refresh
  // useEffect(() => {
  //   const storageToken = localStorage.getItem("accessToken");
  //   if (storageToken) {
  //     fetch("/api/auth/check", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         authorization: storageToken,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((body) => {
  //         if (body.success) {
  //           setUser(body.user);
  //           setToken(storageToken);
  //           navigate("/account");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     console.log("not log");
  //   }
  // }, [token]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        projects,
        setProjects,
      }}
    >
      <div className="root">
        <Header />
        {/* {error && <ErrorModal message={error} />} */}
        <Outlet />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default Root;
