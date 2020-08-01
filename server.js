// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var storage = require("./db/storage.js")

// Sets up the Express App
// =============================================================

var app = express();
var PORT =process.env.PORT ||3000;

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


// The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

//  GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  // var jsonnotebook = JSON.parse(notebook)
  // console.log("jsonnotebook",jsonnotebook)
  var notebook = storage.getNotes()
  res.json(notebook);
});

//Create new note
app.post("/api/notes",function(req,res){
var anotherNote = req.body;
console.log(anotherNote);
storage.addNote(anotherNote)
    res.json(anotherNote);
});

app.delete("/api/notes/:id",function(req,res){
  storage.deleteNote(req.params.id);
  res.json({ok:true})
})

//* GET `*` - Should return the `index.html` file
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//* GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// The following API routes should be created:
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.