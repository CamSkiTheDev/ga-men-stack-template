// require modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const morgan = require("morgan");

// create database connection instence to moniter db connection
const db = mongoose.connection;

// connect to database
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("Connected to database")
);

// listen for database connection events
db.on("open", () => console.log("Connected to database opened"));
db.on("error", (err) => console.log(err));
db.on("close", () => console.log("Connection to database closed"));

// create app and port instance
const port = process.env.PORT || 3000;
const app = express();

// set view engine to ejs
app.set("view engine", "ejs");

// set all of our express middleware
app.use(cors());
app.use(methodOverride("_method")); // overrides POST request to be PUT/DELETE
app.use(express.static("public")); // make public folder accessable
app.use(morgan("tiny")); // logs http request
app.use(express.json()); // parses json request bodies
app.use(express.urlencoded({ extended: true })); // parses formData bodies

// set our routers/routes
app.use("/", require("./routes/index")); // require our index router

// start app
app.listen(port, () =>
  console.log(`🚀 Server Launch: Listening on port: ${port}`)
);
