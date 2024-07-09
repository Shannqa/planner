import {
  notes_get,
  notes_post,
  notes_put,
  notes_delete,
  notes_id_get,
  notes_id_put,
  notes_id_delete,
} from "../controllers/note_controller.js";
import express from "express";
import { LocalAuth, JwtAuth, authJWT } from "../config/auth.js";

const router = express.Router();

// get all notes
router.get("/", authJWT, notes_get);

// add a note
router.post("/", authJWT, notes_post);

// edit multiple notes listed in req body
router.put("/", authJWT, notes_put);

// delete multiple notes listed in req.body
router.delete("/", authJWT, notes_delete);

// get a single note
router.get("/:id", authJWT, notes_id_get);

// edit a single note
router.put("/:id", authJWT, notes_id_put);

// delete a single note
router.delete("/:id", authJWT, notes_id_delete);

export default router;
