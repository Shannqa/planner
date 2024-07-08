import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;
