const express = require("express");

const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

let database;

MongoClient.connect(
  process.env.DB_CONN,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) process.exit(1);
    console.log("Connected to mongodb ...");

    //get request
    app.get("/api/contacts", (req, res) => {
      const contactsCollection = database.collection("contacts");

      contactsCollection.find({}).toArray((err, docs) => {
        if (err) process.exit(1);
        return res.json(docs);
      });
    });

    //post request
    app.post("/api/contacts", (req, res) => {
      const usr = req.body;

      const contactsCollection = database.collection("contacts");

      contactsCollection.insertOne(usr, (err, r) => {
        if (err) process.exit(1);

        const newUser = r.ops[0];

        return res.status(201).json(newUser);
      });
    });

    app.use(errorhandler());
    app.listen(3000, () => {
      database = client.db("contacts-app-vm");
      console.log("listening on port 3000");
    });
  }
);
