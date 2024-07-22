import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./Root.jsx";

function Header() {
  return (
    <div className="header">
      <h1>
        <img src="/note_stack_30dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" />
        <Link to="/">Planner</Link>
      </h1>
    </div>
  );
}

export default Header;
