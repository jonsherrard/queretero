const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
var FakerHandlebarsHelper = require("handlebars-faker");
hbs.registerHelper("faker", FakerHandlebarsHelper);

const indexRouter = require("./routes/index");

const commentsApiRouter = require("./routes/api/comments");
const upvotesApiRouter = require("./routes/api/upvotes");

const app = express();

if (process.env.NODE_ENV != "test" || process.env.NODE_ENV === "production") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");
  // Disable in testing mode
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once("connection", (callbackData) => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
  app.use(logger("dev"));
}

hbs.registerPartials(__dirname + "/views/partials");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// API
app.use("/api/comments", commentsApiRouter);
app.use("/api/upvotes", upvotesApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
