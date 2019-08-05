// implement your API here
const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("howdy");
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else {
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The users information could not be retrieved." });
      });
  }
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  //   const id = Users.findById(req.params.id);
  const id = req.params.id;
  //   if (id !== Users.findById(req.params.id)) {
  if (!id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    Users.findById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The user information could not be retrieved." });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(user => {
      res.status(200).json({ message: "That User's outta here" });
    })
    .catch(err => {
      res
        .catch(500)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

const port = 8000;
server.listen(port, () => console.log("api is feelin like a million bucks"));
