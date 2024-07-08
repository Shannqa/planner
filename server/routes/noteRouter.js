import {
  notes_post,
  notes_put,
  notes_delete,
  notes_id_get,
  notes_id_put,
  notes_id_delete
} from "../controllers/todo_controller.js";
import express from "express";
import { LocalAuth, JwtAuth, authJWT } from "../config/auth.js";

const router = express.Router();

// add a note
router.post("notes/", authJWT, notes_post)

// edit multiple notes listed in req body
router.put("notes/", authJWT, notes_put)

// delete multiple notes listed in req.body
router.delete("notes/", authJWT, notes_delete)

// get a single note
router.get("notes/:id", authJWT, notes_id_get)

// edit a single note
router.put("notes/:id", authJWT, notes_id_put)

// delete a single note
router.delete("notes/:id", authJWT, notes_id_delete)



router.get("/todos", authJWT, todos_all_get);
router.get("/todos/:id", authJWT, todos_get);
router.post("/todos", authJWT, todos_post);
router.put("/todos/:id", authJWT, todos_put);
router.delete("/todos/:id", authJWT, todos_delete);

export default router;
