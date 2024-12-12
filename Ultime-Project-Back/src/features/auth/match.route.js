import express from "express";
import validate from "../../middlewares/validation.middleware.js";
import { MatchSchema } from "../users/users.schema.js";
import Match from "../users/match.model.js";
const router = express.Router();

router.post("/matchs", validate(MatchSchema), async (req, res) => {
  const { title, startTime } = req.body;
  const match = new Match({ title, startTime });
  await match.save();
  res.status(201).json(match);
});

router.get("/matchs", async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

export { router as matchRoutes };
