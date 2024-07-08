import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  categories: { type: Schema.Types.ObjectId, ref: "Category", }
});

const User = mongoose.model("User", UserSchema);

export default User;
