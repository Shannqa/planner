import { Link } from "react-router-dom";

function AddNote() {
  return (
    <Link to="/notes/add">
      <button className="add-button">+</button>
    </Link>
  );
}

export default AddNote;
