const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { default: helmet } = require("helmet");

const roomsRouter = require("./routers/rooms/rooms");
const usersRouter = require("./routers/users/users");
const gamesRouter = require("./routers/games/games");
const { notFoundError, errorHandler } = require("./middlewares/errors/errors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/rooms", roomsRouter);
app.use("/accounts", usersRouter);
app.use("/games", gamesRouter);

app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
