import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 0,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: true,
      default: null,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user", "premium"],
    },
    platform: {
      type: String,
      enum: ["github", null],
      default: null,
    },
    documents: [
      {
        name: {
          type: String,
          enum: [
            { document1: "identificación", default: false },
            { document2: "comprobante de dirección", default: false },
            { document3: "comprobante de estado de cuenta", default: false },
          ],
        },
        reference: {
          type: String,
          required: true,
        },
      },
    ],
    lastConnection: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("findOne", function (next) {
  this.populate({
    path: "cart",
    populate: {
      path: "products.product",
    },
  });
  next();
});

export const UserModel = mongoose.model("Users", userSchema);
