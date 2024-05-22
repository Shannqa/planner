import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./Root.jsx";

function Header() {
  return (
    <div className="header">
      <h1>P tracker</h1>
    </div>
  );
}

export default Header;
