import {
  project_get,
  project_post,
  project_put,
  project_delete,
} from "../controllers/project_controller.js";
import express from "express";
import { LocalAuth, JwtAuth, authJWT } from "../config/auth.js";

const router = express.Router();

router.get("/project", authJWT, project_get);
router.post("/project", authJWT, project_post);
router.put("/project", authJWT, project_put);
router.delete("/project", authJWT, project_delete);

export default router;
