const express = require("express");
const Project = require("./ProjectSchema");
const { authenticate, authorize } = require("./auth");
const router = express.Router();

router.post("/add", authenticate, authorize(["student"]), async (req, res) => {
  const { title, description } = req.body;

  try {
    const project = new Project({
      title,
      description,
      studentId: req.user.id,
    });
    await project.save();
    res.status(201).json({ message: "Project created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/getAll", authenticate, async (req, res) => {
  try {
    const query = req.user.role === "student" ? { studentId: req.user.id } : {};
    const projects = await Project.find(query).populate("studentId supervisorId");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get/:id", authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (req.user.role === "student" && project.studentId._id.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", authenticate, authorize(["supervisor"]), async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/delete/:id", authenticate, authorize(["supervisor"]), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;