import React from "react";
import Notes from "./Notes.jsx";

function NotesDeleted() {
  return (
    <div className="notes-all">
      <h2>Deleted notes</h2>
      <Notes view={"deleted"} />
    </div>
  );
}

export default NotesDeleted;
