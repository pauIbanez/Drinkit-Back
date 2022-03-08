const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { default: helmet } = require("helmet");
const { notFoundError, errorHandler } = require("./middlewares/errors");

const roomsRouter = require("./routers/rooms/rooms");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/rooms", roomsRouter);

app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
