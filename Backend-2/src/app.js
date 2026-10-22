const express = require('express');
const noteModel = require("./models/note.model")

const app = express();
app.use(express.json());

/*
    POST /notes => Create a note
    GET /notes => Get all notes
    DELETE /notes/:index => Delete all notes
    PATCH /notes/:index => Update all notes

*/

// CREATE
app.post("/notes",async (req,res)=>{
    const data = req.body /* {title,description} */
    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "Note created"
    })
})


// FETCH
app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find() // []
    res.status(200).json({
        message:"notes fetched successfully",
        notes: notes
    })
})

// DELETE
app.delete("/notes/:id", async (req,res)=>{
    const id = req.params.id
    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "Note delete successfully"
    })
})

// UPDATE
app.patch("/notes/:id", async (req,res)=>{
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({
        _id: id
    },{
        description: description
    })

    res.status(200).json({
        message: "Notes Updated Successfully"
    })
})

module.exports = app;