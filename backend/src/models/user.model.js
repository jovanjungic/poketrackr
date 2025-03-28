import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    cardCollection: {
      type: [
        {
          cardId: { type: String, required: true },
          quantity: { type: Number, required: true },
          cardValue: { type: Number, default: 0 },
        },
      ],
      required: true,
      default: [],
    },
    cardCollectionValue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Always hash the password before saving a user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
