const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  supervisorId: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["proposed", "completed"], default: "proposed" },
});

module.exports = mongoose.model("Project", ProjectSchema);
