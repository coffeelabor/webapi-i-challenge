// implement your API here
const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("howdy");
});

server.get("/users", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Bad news bruh, you cannot GET that array" });
    });
});

const port = 8000;
server.listen(port, () => console.log("api is feelin like a million bucks"));
