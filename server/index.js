const express = require("express");

const app = express();

const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

let database;

MongoClient.connect(
  process.env.DB_CONN,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) process.exit(1);
    console.log("Connected to mongodb ...");

    app.get("/contacts", (req, res) => {
      const contactsCollection = database.collection("contacts");

      contactsCollection.find({}).toArray((err, docs) => {
        if (err) process.exit(1);
        return res.json(docs);
      });
    });

    app.listen(3000, () => {
      database = client.db("contacts-app-vm");
      console.log("listening on port 3000");
    });
  }
);
