import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: false },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
