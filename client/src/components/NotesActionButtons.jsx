function NotesActionButtons({ view, handler }) {
  if (view === "active") {
    return (
      <div>
        <button onClick={() => handler("archive")}>Archive notes</button>
        <button onClick={() => handler("delete")}>Delete notes</button>
      </div>
    );
  } else if (view === "archived") {
    return (
      <div>
        <button onClick={() => handler("restore")}>Restore notes</button>
        <button onClick={() => handler("delete")}>Delete notes</button>
      </div>
    );
  } else if (view === "deleted") {
    return (
      <div>
        <button onClick={() => handler("restore")}>Restore notes</button>
        <button onClick={() => handler("deletePerm")}>
          Permanently delete notes
        </button>
      </div>
    );
  }
}

export default NotesActionButtons;
