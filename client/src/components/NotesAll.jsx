import React from "react";
import Notes from "./Notes.jsx";

function NotesAll() {
  return (
    <div className="notes-all">
      <h2>All notes</h2>
      <Notes view={"active"} />
    </div>
  );
}

export default NotesAll;
