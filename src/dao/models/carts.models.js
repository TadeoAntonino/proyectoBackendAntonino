import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        type: cartItemSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("findOne", function (next) {
  this.populate("products.product");
  next();
});

const CartsModel = mongoose.model("carts", cartSchema);
export default CartsModel;
