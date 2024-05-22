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

const projects_post = [
  body("name", "Project must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res) => {
    console.log(req.user);
    try {
      let body = { ...req.body, user: req.user };
      const project = new Project(body);
      await project.save();

      res.status(200).json({
        success: true,
        msg: "success",
        id: project._id,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
];

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

export { project_get, projects_post, project_put, project_delete };
