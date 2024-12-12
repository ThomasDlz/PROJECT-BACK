import mongoose, { model } from "mongoose";

const MatchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
});

export default model("Match", MatchSchema);
