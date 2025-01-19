const express = require("express");
const mongoose = require("mongoose");
const db = require('./db')
const userRoutes = require("./UserRouter");
const projectRoutes = require("./ProjectRouter");
const app = express();
app.use(express.json());
const PORT = 3000;



app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});