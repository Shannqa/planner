import Note from "../models/noteSchema.js";
import { body, validationResult } from "express-validator";


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
]

// edit multiple notes listed in req body
router.put("notes/", authJWT, notes_put)

// delete multiple notes listed in req.body
router.delete("notes/", authJWT, notes_delete)

// get a single note
const notes_id_get = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).exec();
    if (!note) {
      res.status(204).json({ msg: "No note with this id" });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json(err);
  }
};

// edit a single note
router.put("notes/:id", authJWT, notes_id_put)

// delete a single note
router.delete("notes/:id", authJWT, notes_id_delete)









// get a single note
const notes_get = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).exec();
    if (!note) {
      res.status(204).json({ msg: "No note with this id" });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).send(err);
  }
};

// get all notes of a user
const notes_all_get = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).exec();
    console.log(req.user);
    if (!notes) {
      res.status(204).json({ msg: "No notes found" });
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).send(err);
  }
};

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
      let body = { ...req.body, user: req.user };
      const note = new Note(body);
      await note.save();

      res.status(200).json({
        success: true,
        msg: "success",
        id: note._id,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
];

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
      res.status(500).send(err);
    }
  },
];

const notes_delete = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id).exec();
    if (!note) {
      res.status(204).json({ msg: "No note with this id" });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export { notes_get, notes_post, notes_put, notes_delete, notes_all_get };