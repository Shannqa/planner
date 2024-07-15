import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date },
  status: { type: String, default: "active", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

NoteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;
