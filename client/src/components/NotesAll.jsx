import React from "react";
import Notes from "./Notes.jsx";
import AddNote from "./AddNote.jsx";

function NotesAll() {
  return (
    <div className="notes-all">
      <h2>All notes</h2>
      <Notes view={"active"} />
      <AddNote />
    </div>
  );
}

export default NotesAll;
