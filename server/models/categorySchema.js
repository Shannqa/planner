import mongoose from "mongoose";

const Schema = mongoose.Schema;


/*
  1 document per user, in field custom is a list of custom categories
  
  or 1 document per category
*/

const CategorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: Schema.Types.String, required: true }
})

const CategorySchema1 = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  custom: [
    {
      id: { type: Schema.Types.UUID },
      name: { type: Schema.Types.String }
    }
  ],
});


const Category = mongoose.model("Category", CategorySchema);

export default Category;


