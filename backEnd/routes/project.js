// routes/project.js
const express = require("express");
const Project = require("../models/Project");
const auth = require("../middlewares/auth");
const router = express.Router();

// Create a new project
router.post("/", auth, async (req, res) => {
  const project = new Project({ ...req.body });
  await project.save();
  res.send(project);
});

// Get all projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

// Get single project
router.get("/:id", auth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.send(project);
});

// Update project
router.put("/:id", auth, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(project);
});

module.exports = router;
