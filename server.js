var express = require("express");
var db = require("./db/db.json");
var fs = require("fs");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(db);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;

  // newNote.routName = newNote.title.replace(/\s+/g, "").toLowerCase();

  db.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      console.log("error");
    } else {
      console.log("Success!");
    }
  });
});

app.delete("/api/notes/:id", function (req, res) {
  var chosenNote = req.params.id;

  console.log(id);

  for (var i = 0; i < db.length; i++) {
    if (chosenNote === db[i].title) {
    }
  }
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
