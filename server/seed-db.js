require("dotenv").config();

const users = require("./users");
const contacts = require("./contacts");

const MongoClient = require("mongodb").MongoClient(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const bcrypt = require("bcrypt");

function seedCollection(collectionName, records) {
  MongoClient.connect(err => {
    if (err) process.exit(1);
    console.log("connected to the cluster");

    const collection = MongoClient.db("contacts-app-vm").collection(
      collectionName
    );
    collection.deleteMany();

    records.forEach(element => {
      if (element.password) {
        element.password = bcrypt.hashSync(element.password, 10);
      }
    });

    collection.insertMany(records, (err, result) => {
      if (err) process.exit(1);
      console.log(`${result.insertedCount} records inserted`);
      console.log("closing connection ...");
      MongoClient.close();
      console.log("connection closed !");
    });
  });
}

seedCollection("users", users);
seedCollection("contacts", contacts);
