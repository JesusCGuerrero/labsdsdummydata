const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authenticate = require('../auth/authenticate-middleware')

const dataRouter = require("../ds_data/data-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/data", dataRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
