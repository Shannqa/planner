import {
  todos_get,
  todos_post,
  todos_put,
  todos_delete,
  todos_all_get,
} from "../controllers/todo_controller.js";
import express from "express";
import { LocalAuth, JwtAuth, authJWT } from "../config/auth.js";

const router = express.Router();

router.get("/todos", authJWT, todos_all_get);
router.get("/todos/:id", authJWT, todos_get);
router.post("/todos", authJWT, todos_post);
router.put("/todos/:id", authJWT, todos_put);
router.delete("/todos/:id", authJWT, todos_delete);

export default router;
