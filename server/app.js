import createError from "http-errors";
import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import __dirname from "./utils/dirname.js";
import cookieParser from "cookie-parser";
import logger from "morgan";
import authRouter from "./routes/authRouter.js";
import noteRouter from "./routes/noteRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import connectDB from "./config/db.js";
import MongoStore from "connect-mongo";
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// view engine setup
app.set("views", "views");
app.set("view engine", "ejs");

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.use("/api/categories", categoryRouter);

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
  res.status(err.status || 500).json(err);
  // res.render("error");
});

export default app;
