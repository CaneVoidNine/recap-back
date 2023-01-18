import mongoose from "mongoose";

const { Schema, model } = mongoose;

const waifuSchema = new Schema(
  {
    title: { type: String, required: true },
    info: { type: String, required: false },
    release: { type: String, required: false },
    rating: { type: Number, required: false },
    cover: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Waifu's", waifuSchema);
