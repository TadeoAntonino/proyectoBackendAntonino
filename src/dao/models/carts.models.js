import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";

const schema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          min: 0,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function (next) {
  this.populate("products.product");
  next();
});

schema.plugin(MongooseDelete, { deletedAt: true });

export const CartsModel = mongoose.model("carts", schema);
