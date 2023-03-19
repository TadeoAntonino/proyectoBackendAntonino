import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    purchase_datetime: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(MongooseDelete, { deletedAt: true });

export const TicketsModel = mongoose.model("tickets", schema);
