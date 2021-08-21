var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
var initDb = require("./utils/init-db");
const { getMockUser } = require("./utils/mock-user");

var indexRouter = require("./routes/index");
var sprintRouter = require("./routes/sprint");
var taskRouter = require('./routes/task');

var app = express();

initDb();
app.use((req, res, next) => {
  req.user = getMockUser();
  next();
});
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1/sprint", sprintRouter);
app.use('/v1/task', taskRouter);
app.use("/v1", indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("Resource not found");
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
