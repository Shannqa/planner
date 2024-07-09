import Note from "../models/noteSchema.js";
import { body, validationResult } from "express-validator";

// get all notes
const notes_get = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id })
      .populate("category", ["name"])
      .exec();
    console.log(req.user);
    if (!notes) {
      res.status(204).json({ msg: "No notes found" });
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
};

// add a note
const notes_post = [
  body("title", "The title must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "The content must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category").escape(),
  async (req, res) => {
    console.log(req.body);
    try {
      let body = { user: req.user._id, ...req.body };
      const note = new Note(body);
      await note.save();

      res.status(200).json({
        success: true,
        id: note._id,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
];

// edit multiple notes listed in req body
const notes_put = [
  body("title", "The title must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "The content must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category").escape(),
  async (req, res) => {
    try {
      let body = { ...req.body, user: req.user };
      const note = await Note.findByIdAndUpdate(req.params.id, body).exec();
      const updatedNote = await Note.findById(req.params.id);

      if (!note) {
        res.status(204).json({ msg: "No note with this id" });
      } else {
        res.status(200).json({ success: true, todo: updatedNote });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
];

// delete multiple notes listed in req.body
const notes_delete = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id).exec();
    if (!note) {
      res.status(204).json({ msg: "No note with this id" });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single note
const notes_id_get = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate("category", ["name"])
      .exec();
    if (!note) {
      res.status(204).json({ msg: "No note with this id" });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json(err);
  }
};

// edit a single note
const notes_id_put = [
  body("title", "The title must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "The content must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category").escape(),
  async (req, res) => {
    try {
      let body = { ...req.body, user: req.user };
      console.log("body", req.body);
      const note = await Note.findByIdAndUpdate(req.params.id, body)
        .populate("category", ["name"])
        .exec();
      console.log("note", note);
      const updatedNote = await Note.findById(req.params.id).populate(
        "category",
        ["name"]
      );
      console.log("updated", updatedNote);
      if (!note) {
        res.status(204).json({ msg: "No note with this id" });
      } else {
        res.status(200).json({ success: true, note: updatedNote });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
];

// delete a single note

const notes_id_delete = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id).exec();
    if (!note) {
      res.status(204).json({ msg: "No note with this id" });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  notes_id_get,
  notes_post,
  notes_put,
  notes_delete,
  notes_get,
  notes_id_put,
  notes_id_delete,
};
