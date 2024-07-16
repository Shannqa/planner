import Note from "../models/noteSchema.js";
import { body, validationResult } from "express-validator";

// get all notes
const notes_get = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id, status: "active" })
      .populate("category", ["name"])
      .exec();
    console.log(req.user);
    if (!notes || notes.length < 1) {
      res.status(204).json({ msg: "No notes found" });
    } else {
      res.status(200).json(notes);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get archived notes
const notes_get_archived = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id, status: "archived" })
      .populate("category", ["name"])
      .exec();
    console.log(req.user);
    if (!notes || notes.length < 1) {
      res.status(204).json({ msg: "No notes found" });
    } else {
      res.status(200).json(notes);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get deleted notes
const notes_get_deleted = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id, status: "deleted" })
      .populate("category", ["name"])
      .exec();
    console.log(notes);
    if (!notes || notes.length < 1) {
      res.status(204).json({ msg: "No notes found" });
    } else {
      res.status(200).json(notes);
    }
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
    .isLength({ min: 1 }),
  body("category").escape(),
  async (req, res) => {
    console.log(req.body);
    try {
      let body = { user: req.user._id, status: "active", ...req.body };
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
const notes_patch = [
  body("ids", "You must select at least one note.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("action", "Incorrect action.").trim().isLength({ min: 1 }).escape(),
  async (req, res) => {
    try {
      console.log(req.body);
      const ids = req.body.ids || null;

      if (!ids || ids.length < 1) {
        return res.status(500).json({ msg: "No notes selected." });
      }

      const action = req.body.action;
      let status;

      if (action === "delete") {
        status = "deleted";
      } else if (action === "archive") {
        status = "archived";
      } else if (action === "restore") {
        status = "active";
      } else {
        return res.status(500).json({ msg: "Incorrect action" });
      }

      const notes = await Note.updateMany(
        {
          _id: { $in: ids },
        },
        { status: status },
        { multi: true }
      ).exec();
      console.log("notes", notes);

      if (!notes) {
        res.status(204).json({ msg: "No notes with this id" });
      } else {
        res.status(200).json(ids);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
];

// permanently delete multiple notes listed in req.body
const notes_delete = async (req, res) => {
  try {
    console.log(req.body);
    const ids = req.body.ids || null;

    if (!ids || ids.length < 1) {
      res.status(500).json({ msg: "No notes selected." });
    } else if (req.body.action !== "deletePerm") {
      res.status(500).json({ msg: "Invalid action." });
    }

    const notes = await Note.deleteMany({
      _id: { $in: ids },
    }).exec();
    console.log("notes", notes);

    if (!notes) {
      res.status(204).json({ msg: "No notes with this id" });
    } else {
      res.status(200).json(ids);
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
    .isLength({ min: 1 }),
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

// permanently delete a single note
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

// change note's status
const notes_id_patch = async (req, res) => {
  try {
    let body = { ...req.body };
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
};

export {
  notes_id_get,
  notes_post,
  notes_patch,
  notes_delete,
  notes_get,
  notes_id_put,
  notes_id_delete,
  notes_get_archived,
  notes_get_deleted,
  notes_id_patch,
};
