const express = require("express");
const app = express();
const port = 3000;

// controllers
const {
  getAllAuthors,
  getAuthorById,
  addNewAuthor,
} = require("./controllers/author.controller");

app.use(express.json());

// get all authors

app.get("/authors", (req, res) => {
  let result = getAllAuthors();
  if (!result) {
    return res.status(404).send({ message: "Authors not found" });
  } else {
    return res.status(200).send(result);
  }
});

// get  author by id
app.get("/authors/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let result = getAuthorById(id);
  if (!result) {
    return res.status(404).send({ message: "Author not found" });
  } else {
    return res.status(200).send(result);
  }
});

// add new author
app.post("/authors/new", (req, res) => {
  let author = req.body;
  let result = addNewAuthor(author);
  if (!result) {
    return res.status(400).send({ message: "Author not created" });
  } else {
    return res.status(201).send(result);
  }
});

module.exports = { app, port };
