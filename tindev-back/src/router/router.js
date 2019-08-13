import express from "express";
import devController from "../controllers/devController";
import likeController from "../controllers/likeController";
import dislikeController from "../controllers/dislikeController";

const routes = express.Router();

routes.get("/", (req, res) => res.json({ status : "200 OK" }));

routes.get("/devs", devController.index);
routes.post("/devs", devController.store);
routes.post("/devs/:devId/likes", likeController.store);
routes.post("/devs/:devId/dislikes", dislikeController.store);
module.exports = routes;