import {
  categories_get,
  categories_post,
  categories_id_get,
  categories_id_put,
  categories_id_delete,
} from "../controllers/category_controller.js";
import express from "express";
import { LocalAuth, JwtAuth, authJWT } from "../config/auth.js";

const router = express.Router();

// list all categories of a user
router.get("/", authJWT, categories_get);

// add new category
router.post("/", authJWT, categories_post);

// get all notes for a single category
router.get("/:id", authJWT, categories_id_get);

// edit category's name
router.put("/:id", authJWT, categories_id_put);

// delete category
router.delete("/:id", authJWT, categories_id_delete);

export default router;
