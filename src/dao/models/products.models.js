import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import pagination from "mongoose-paginate-v2";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(MongooseDelete, { deletedAt: true });
schema.plugin(pagination);

export const ProductsModel = mongoose.model("products", schema);
