import {
  notes_get,
  notes_post,
  notes_patch,
  notes_delete,
  notes_get_archived,
  notes_get_deleted,
  notes_id_get,
  notes_id_put,
  notes_id_delete,
  notes_id_patch,
} from "../controllers/note_controller.js";
import express from "express";
import { LocalAuth, JwtAuth, authJWT } from "../config/auth.js";

const router = express.Router();

// get all notes
router.get("/", authJWT, notes_get);

// add a note
router.post("/", authJWT, notes_post);

// edit multiple notes listed in req body
router.patch("/", authJWT, notes_patch);

// delete multiple notes listed in req.body
router.delete("/", authJWT, notes_delete);

// get archived notes
router.get("/archived", authJWT, notes_get_archived);

// get deleted notes
router.get("/deleted", authJWT, notes_get_deleted);

// get a single note
router.get("/:id", authJWT, notes_id_get);

// edit a single note
router.put("/:id", authJWT, notes_id_put);

// change status of note
router.patch("/:id", authJWT, notes_id_patch);

// delete a single note
router.delete("/:id", authJWT, notes_id_delete);

export default router;
