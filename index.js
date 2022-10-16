const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // MongoDB session store
const cloudinary = require("cloudinary").v2;
const app = express();

const tradeRouter = require("./routes/tradeRoute");
const profileRouter = require("./routes/profileRoute");

const sessionSecret = "secretString-sessionSecret";
var atlasMongoDB =
  "mongodb+srv://adriantims:47ju9QfRFTx4XB6e@trajourn.qavvh1o.mongodb.net/?retryWrites=true&w=majority";

// Session Store:
const store = MongoStore.create({
  mongoUrl: atlasMongoDB,
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
  unset: "destroy",
  cookie: {
    httpOnly: false,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    // TODO add: 'secure: true' once the website is hosted on HTTPS.
  },
};

cloudinary.config({
  cloud_name: "desuwgavt",
  api_key: "422624985768454",
  api_secret: "3W4a6-TcbF0pNihj09aRsHZTglI",
});

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.method, req.path);
  next();
});

// TODO: Add router here
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/trade", tradeRouter);
app.use("/api/profile", profileRouter);

//---------------

const azureCosmosDB =
  "mongodb://trade-database:zDG9pnrkgAmF3kZI8cThtc3SSvSbDRtz7GWuMnoiYN6HAyS5ncBIFiLZ29otpotmUUcYOZPneXxkfCYIZ8ii8Q%3D%3D@trade-database.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@trade-database@";

mongoose
  .connect(azureCosmosDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection is Successful"))
  .catch((err) => console.log("MongoDB connection error:", err));

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started running on port: ${port}`);
});
