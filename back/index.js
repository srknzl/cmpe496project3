const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const url =
  "mongodb+srv://srknzl:PaWS1EQ7E85MHMJP@srknzl-m0-development-cluster-hgcsl.mongodb.net/cmpe496?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "false");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Cookie,Set-Cookie"
  );
  next();
});

let db;

app.post("/vote", (req, res, next) => {
  const vote = req.body.vote;
  const fur = db.collection("furnitures");
  fur.updateOne(
    {
      id: vote,
    },
    { $inc: { vote: 1 } },
    (err, result) => {
      if (err) res.status(500).json("DB error");
      else {
        res.status(201).json("ok");
      }
    }
  );
});

app.get("/furnitures", (req, res, next) => {
  const fur = db.collection("furnitures");
  fur.find({}).toArray(function (err, docs) {
    if (err) {
      res.status(500).json("Db error");
    }
    res.status(200).json(docs);
  });
});

app.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const collection = db.collection("users");
  collection
    .find({
      email: email,
    })
    .toArray((err, docs) => {
      if (err) res.status(500).json("DB error");
      else {
        if (docs.length == 0) {
        } else {
          if (docs[0].password == password) {
            res.status(200).json({ user: docs[0].email });
          } else {
            res.status(401).json("wrong password");
          }
        }
      }
    });
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

MongoClient.connect(url, async (err, client) => {
  if (err) console.log(err);
  else {
    db = client.db("cmpe496");

    const fur = db.collection("furnitures");
    try {
      await fur.drop();
    } catch (error) {
      console.log(error);
    }
    fur.insertMany(
      [
        {
          id: 1,
          imageUrl:
            "https://st3.myideasoft.com/shop/bo/48/myassets/products/252/modalife-grande-masa-seti-miray-cappucino.jpg?revision=1589975406",
          name: "Grande Masa",
          price: 349,
          vote: 0,
        },
        {
          id: 2,
          imageUrl:
            "https://st1.myideasoft.com/shop/bo/48/myassets/products/979/bianco-koltuk-tk-2-alt-01.jpg?revision=1540969752",
          name: "Bianco Midi Koltuk Takımı",
          price: 3582,
          vote: 0,
        },
        {
          id: 3,
          imageUrl:
            "https://st3.myideasoft.com/shop/bo/48/myassets/products/870/valentino-1-alternetif-01.jpg?revision=1540969907",
          name: "Valentico Midi Koltuk Takımı",
          price: 4693,
          vote: 0,
        },
        {
          id: 4,
          imageUrl:
            "https://st3.myideasoft.com/shop/bo/48/myassets/products/922/modalife-demre-uclu-dugun-paketi.jpg?revision=1583329957",
          name: "Demre Düğün Paketi",
          price: 18442,
          vote: 0,
        },
        {
          id: 5,
          imageUrl:
            "https://st1.myideasoft.com/shop/bo/48/myassets/products/188/anfora-ymk-od-01.jpg?revision=1582870641",
          name: "Anfora Yemek Odası Takımı",
          price: 5976,
          vote: 0,
        },
        {
          id: 6,
          imageUrl:
            "https://st1.myideasoft.com/shop/bo/48/myassets/products/241/lexus-alternatif-renk-01.jpg?revision=1585040141",
          name: "Lexus Midi Koltuk Takımı",
          price: 5976,
          vote: 0,
        },
        {
          id: 7,
          imageUrl:
            "https://st3.myideasoft.com/shop/bo/48/myassets/products/016/1.jpg?revision=1579522593",
          name: "Valentino Köşe Takımı",
          price: 3992,
          vote: 0,
        },
        {
          id: 8,
          imageUrl:
            "https://st3.myideasoft.com/shop/bo/48/myassets/products/912/1.jpg?revision=1577275996",
          name: "Nero Koltuk Takımı",
          price: 3320,
          vote: 0,
        },
        {
          id: 9,
          imageUrl:
            "https://st3.myideasoft.com/shop/bo/48/myassets/products/917/1.jpg?revision=1577283825",
          name: "Eva Koltuk Takımı",
          price: 4124,
          vote: 0,
        },
        {
          id: 10,
          imageUrl:
            "https://st3.myideasoft.com/shop/bo/48/myassets/products/450/olivya-klt-tk-tekil-01.jpg?revision=1545639712",
          name: "Olivya Üçlü Kanepe Gri",
          price: 1786,
          vote: 0,
        },
      ],
      (err, result) => {
        if (err) console.log("Cannot add database entries");
        else {
          console.log(result);
          app.listen(3000, () => {
            console.log("Server is running..");
          });
        }
      }
    );
  }
});
