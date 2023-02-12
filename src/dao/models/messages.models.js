import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    messages: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const MessagesModel = mongoose.model("messages", schema);
