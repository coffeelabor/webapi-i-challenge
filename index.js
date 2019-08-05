// implement your API here
const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("howdy");
});

server.post("/api/users", (req, res) => {
  //insert(user)
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
  //find()
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
  //findById(id)
  //   const getId = Users.findById(req.params.id);
  const getId = req.params.id;
  //   if (getId !== Users.findById(req.params.id)) {
  //   if (getId !== Users.find(req.params.id)) {
  //   if (!getId) {
  //     res
  //       .status(404)
  //       .json({ message: "The user with the specified ID does not exist." });
  //   } else {

  Users.findById(getId)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  //remove(id)
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

server.put("/api/users/:id", (req, res) => {
  //update(id, user)
  const id = req.params.id;
  const { name, bio } = req.body;

  if (!id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user." });
    } else {
      Users.update(id, { name, bio })
        .then(updated => {
          res.status(200).json(updated);
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "The user information could not be modified." });
        });
    }
  }
});

const port = 8000;
server.listen(port, () => console.log("api is feelin like a million bucks"));
