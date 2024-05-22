import Project from "../models/projectSchema.js";
import { body, validationResult } from "express-validator";

const project_get = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).exec();
    if (!project) {
      res.status(204).json({ msg: "No project with this id" });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).send(err);
  }
};

const project_post = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
};

const project_put = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
};

const project_delete = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
};

export { project_get, project_post, project_put, project_delete };
