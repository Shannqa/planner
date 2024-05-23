import {
  project_get,
  projects_post,
  project_put,
  project_delete,
  projects_get,
} from "../controllers/project_controller.js";
import express from "express";
import { LocalAuth, JwtAuth, authJWT } from "../config/auth.js";

const router = express.Router();

router.get("/projects/:id", authJWT, project_get);
router.post("/project", authJWT, projects_post);
router.put("/projects/:id", authJWT, project_put);
router.delete("/projects/:id", authJWT, project_delete);

router.get("/projects", authJWT, projects_get);

export default router;
