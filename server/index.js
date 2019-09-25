const express = require("express");

const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

    //Authenticate route
    app.post("/api/authenticate", (req, res) => {
      const user = req.body;
      const usersCollection = database.collection("users");
      usersCollection.findOne({ username: user.username }, (err, result) => {
        if (!result) {
          return res.status(404).json({ error: "User not found" });
        }

        if (!bcrypt.compareSync(user.password, result.password)) {
          return res.status(401).json({ error: "Incorrect Password" });
        }

        const payload = {
          username: result.username,
          admin: result.admin
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "4h"
        });

        return res.json({
          message: "Successfully authenticated",
          token: token
        });
      });
    });

    app.use(errorhandler());
    app.listen(3000, () => {
      database = client.db("contacts-app-vm");
      console.log("listening on port 3000");
    });
  }
);
