const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // MongoDB session store
const app = express();

const sessionSecret = "secretString-sessionSecret";
var mongoDB =
  "mongodb+srv://adriantims:FKT7jkQq69PFEJhm@trajourn.qavvh1o.mongodb.net/?retryWrites=true&w=majority";

// Session Store:
const store = MongoStore.create({
  mongoUrl: mongoDB,
  secret: sessionSecret,
  touchAfter: 24 * 60 * 60,
});

// express-session package
const sessionConfig = {
  store,
  name: "session",
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,

  cookie: {
    httpOnly: false,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    // TODO add: 'secure: true' once the website is hosted on HTTPS.
  },
};

app.use(session(sessionConfig));
app.use(bodyParser.json());

// app.use(
//   cors({
//     credentials: true,
//     origin: "https://www.adrianstudy.computer/",
//   })
// );

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.method, req.path);
  next();
});

// TODO: Add router here
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//---------------

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started running on port: ${port}`);
});
