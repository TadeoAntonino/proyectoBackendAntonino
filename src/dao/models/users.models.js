import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: "carts",
    },
    role: {
      type: String,
      enum: ["user", "admin", "premium"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("Users", schema);
