import Todo from "../models/todoSchema.js";
import { body, validationResult } from "express-validator";

const todo_get = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).exec();
    if (!todo) {
      res.status(204).json({ msg: "No todo with this id" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
};

const todo_post = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
};

const todo_put = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
};

const todo_delete = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
};

export { todo_get, todo_post, todo_put, todo_delete };
