import Category from "../models/categorySchema.js";
import Note from "../models/noteSchema.js";
import { body, validationResult } from "express-validator";

// list all categories of a user
const categories_get = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id }).exec();
    if (!categories) {
      res.status(204).json({ msg: "No categories found" });
    } else {
      res.status(200).json(categories);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// add new category
const categories_post = [
  body("name", "Category's name must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res) => {
    try {
      let body = { user: req.user, ...req.body };
      const category = new Category(body);
      await category.save();

      res.status(200).json({
        success: true,
        id: category._id,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
];

// get all notes for a single category

const categories_id_get = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      category: { $in: [req.params.id] },
      status: "active",
    })
      .populate("category", ["name"])
      .exec(); // check if [] needed or not for a single argument
    console.log(notes);
    if (!notes) {
      res.status(204).json({ msg: "No notes for this category" });
    } else {
      res.status(200).json(notes);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// edit category's name
const categories_id_put = [
  body("name", "Category's name must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res) => {
    try {
      let body = { user: req.user, ...req.body };
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        body
      ).exec();

      if (!category) {
        res.status(204).json({ msg: "No category with this id" });
      } else {
        res.status(200).json({ success: true, project: updatedCategory });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
];

// delete category
const categories_id_delete = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id).exec();
    if (!category) {
      res.status(204).json({ msg: "No category with this id" });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  categories_get,
  categories_post,
  categories_id_get,
  categories_id_put,
  categories_id_delete,
};
