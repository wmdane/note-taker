var express = require("express");
var fs = require("fs");
var path = require("path");
var db = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//api routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", function (req, res) {
  let notes = req.body;
  //tried to make this increment every time a note was pushed into the array but it didn't work
  // var idStart = 0;

  notes.id = notes.title; //idStart;

  db.push(notes);

  fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      console.log("error");
    } else {
      console.log("Success!");
    }
  });
  res.json(db);
});

app.delete("/api/notes/:id", function (req, res) {
  var chosenNote = req.params.id;

  for (var i = 0; i < db.length; i++) {
    if (chosenNote === db[i].id) {
      db.splice([i], 1);
      res.json(db);
    }
  }
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
