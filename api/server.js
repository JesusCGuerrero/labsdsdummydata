const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authenticate = require('../auth/authenticate-middleware')

const usersRouter = require("../user/user-router");
const restaurantRouter = require("../restaurant/restaurant-router");
const categoryRouter = require("../category/category-router");
const foodItemRouter = require("../food_item/food_item-router");
const foodImageRouter = require("../food_image/food_image-router");

const dataRouter = require("../ds_data/data-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/user", usersRouter);
server.use("/api/restaurant", restaurantRouter);
server.use("/api/category", categoryRouter);
server.use("/api/item", foodItemRouter);
server.use("/api/image", foodImageRouter);

server.use("/api/data", dataRouter);



server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
