import express from "express";
import validate from "../../middlewares/validation.middleware.js";
import { FavoriteSchema } from "../../features/users/users.schema.js";
import Favorite from "../users/favorite.model.js";
const router = express.Router();

router.post("/favorites", validate(FavoriteSchema), async (req, res) => {
  const { userId, matchId } = req.body;
  const favorite = new Favorite({ userId, matchId });
  await favorite.save();
  res.status(201).json(favorite);
});

export { router as FavoriteRoutes };
