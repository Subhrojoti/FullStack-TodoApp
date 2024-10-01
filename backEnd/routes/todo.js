// routes/todo.js
const express = require("express");
const Project = require("../models/Project");
const auth = require("../middlewares/auth");
const router = express.Router();

// Add a todo
router.post("/:projectId/todos", auth, async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  project.todos.push(req.body);
  await project.save();
  res.send(project);
});

// Mark todo as complete
router.put("/:projectId/todos/:todoId", auth, async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  const todo = project.todos.id(req.params.todoId);
  todo.status = req.body.status;
  await project.save();
  res.send(project);
});

module.exports = router;
