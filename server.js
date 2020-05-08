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

function sendResponse() {
  if (err) {
    res.json({
      success: false,
      message: err,
    });
  } else if (!data) {
    res.json({
      message: " not found",
      success: false,
    });
  } else {
    res.json({
      data: data,
      success: true,
    });
  }
}
// CREATE
app.post("/users", (req, res) => {
  User.create(
    {
      ...req.body.newData,
    },
    (err, data) => {
      sendResponse(res, err, data);
    }
  );
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      {
        new: true,
      },
      (err, data) => {
        sendResponse(res, err, data);
      }
    );
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  });

//Port
const port = 8000;

//Listen for the open port
app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
