import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import usersRouter from "./src/modules/users/routes/users.route.js";

// Fix __dirname in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use("/uploads", express.static("uploads"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

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

export default app; // <-- ES module export
