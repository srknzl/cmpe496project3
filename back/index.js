const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const url =
  "mongodb+srv://srknzl:PaWS1EQ7E85MHMJP@srknzl-m0-development-cluster-hgcsl.mongodb.net/cmpe496?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
let db;

app.post("/vote", (req, res, next) => {
  const vote = req.body.vote;
  const collection = db.collection("furnitureVotes");
  collection.insert(
    {
      vote: vote,
    },
    (err, result) => {
      if (err) res.status(500).json("DB error");
      else res.status(201).json("ok");
    }
  );
});

app.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const collection = db.collection("users");
  collection.find(
    {
      email: email,
    },
    (err, docs) => {
      if (err) res.status(500).json("DB error");
      else {
        console.log(docs);
      }
    }
  );
});
app.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const collection = db.collection("users");
  collection.insert(
    {
      email: email,
      password: password,
    },
    (err, result) => {
      if (err) res.status(500).json("DB error");
      else res.status(201).json("ok");
    }
  );
});

MongoClient.connect(url, (err, client) => {
  if (err) console.log(err);
  else {
    db = client.db("cmpe496");
    app.listen(3000);
  }
});
