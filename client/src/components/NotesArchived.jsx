import React from "react";
import Notes from "./Notes.jsx";

function NotesArchived() {
  return (
    <div className="notes-all">
      <h2>Archived notes</h2>
      <Notes view={"archived"} />
    </div>
  );
}

export default NotesArchived;
