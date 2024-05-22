import {
  todo_get,
  todo_post,
  todo_put,
  todo_delete,
} from "../controllers/todo_controller.js";
import express from "express";
import { LocalAuth, JwtAuth, authJWT } from "../config/auth.js";

const router = express.Router();

router.get("/todo", authJWT, todo_get);
router.post("/todo", authJWT, todo_post);
router.put("/todo", authJWT, todo_put);
router.delete("/todo", authJWT, todo_delete);

export default router;
