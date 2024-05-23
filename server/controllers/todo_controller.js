import Todo from "../models/todoSchema.js";
import { body, validationResult } from "express-validator";

const todos_get = async (req, res) => {
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

const todos_all_get = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).exec();
    console.log(req.user);
    if (!todos) {
      res.status(204).json({ msg: "No todos found" });
    }
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
};

const todos_post = [
  body("name", "Todo must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res) => {
    console.log(req.user);
    try {
      let body = { ...req.body, user: req.user };
      const todo = new Todo(body);
      await todo.save();

      res.status(200).json({
        success: true,
        msg: "success",
        id: todo._id,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
];

const todos_put = [
  body("name", "Todo must be at least 1 character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res) => {
    try {
      let body = { ...req.body, user: req.user };
      const todo = await Todo.findByIdAndUpdate(req.params.id, body).exec();
      const updatedTodo = await Todo.findById(req.params.id);

      if (!todo) {
        res.status(204).json({ msg: "No todo with this id" });
      } else {
        res.status(200).json({ success: true, todo: updatedTodo });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
];

const todos_delete = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id).exec();
    if (!todo) {
      res.status(204).json({ msg: "No todo with this id" });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export { todos_get, todos_post, todos_put, todos_delete, todos_all_get };
