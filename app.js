var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
const cors = require("cors");
var indexRouter = require("./routes/index");

var app = express();

const corsOptions = {
  origin: [
    "https://www.prothomalo.com",
    "https://www.tbsnews.net",
    "https://www.thedailystar.net",
    "https://www.aljazeera.com",
  ],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
