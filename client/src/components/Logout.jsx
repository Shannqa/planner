import { useState, useEffect, useContext } from "react";
import { AppContext } from "./Root.jsx";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { user, setUser } = useContext(AppContext);
  const [logged, setLogged] = useState(null);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUser(null);
    setLogged(null);
    navigate("/");
  }

  return handleLogout();
}

export default Logout;
