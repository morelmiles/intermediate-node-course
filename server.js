const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");

//Coonect to the local database
const url = "mongodb://localhost:27017/userData";
mongoose.connect(url, { useNewUrlParser: true });

//Check if the db has connected
const db = mongoose.connection;
db.once("open ", (_conn) => {
  console.log("Database has connected ", url);
});
db.on("error", (err) => {
  console.log("Connection error ", err);
});
//Initialize express
const app = express();

app.use(bodyParser.json());

// CREATE
app.post("/users", (req, res) => {
  // User.create()
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  });

//Port
const port = 8000;

//Listen for the open port
app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
