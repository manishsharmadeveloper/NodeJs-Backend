const express = require("express");

const app = express();

app.use(express.json());

// title, description
// POST & GET & DELETE & PATCH
const notes = [];

// create a notes
// POST /create
app.post("/notes/create", (req, res) => {
  // console.log(req.body);
  notes.push(req.body);
  res.status(201).json({
    message: "notes created successfully",
  });
});

// fetch notes from existing array of object
// GET /notes/display
app.get("/notes/search", (req, res) => {
  res.status(200).json({
    message: "notes fetched successfully",
    notes: notes,
  });
});

// deleted notes from array of object
// DELETE /notes/delete/:index
app.delete("/notes/delete/:index", (req, res) => {
  const index = req.params.index;
  console.log("delete index : ", index);
  delete notes[index];
  res.status(200).json({
    message: "notes deleted successfully",
  });
});

// update notes from existing of array
// PATCH /notes/update/:index
app.patch("/notes/update/:index", (req, res) => {
  const index = req.params.index;
  console.log("update index : ", index);
  const description = req.body.description;
  notes[index].description = description;
  res.status(200).json({
    message: "notes updated successfully",
  });
});

module.exports = app;
