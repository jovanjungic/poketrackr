// Controller for all auths
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Register a new user.
export const register = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password } = req.body;

    // Check if the email already exists.
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }

    // Check if the username already exists.
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      const error = new Error("Username already exists");
      error.statusCode = 409;
      throw error;
    }

    // Create a new user.
    const newUsers = await User.create([{ username, email, password }], {
      session,
    });

    // Generate a JWT token for the user.
    const token = jwt.sign(
      { userId: newUsers[0]._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Set the JWT token in the cookie.
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + parseInt(process.env.COOKIE_EXPIRY_TIME, 10)
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Commit the transaction and end the session.
    await session.commitTransaction();
    session.endSession();

    // Return a successful response.
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// Log in an existing user.
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user.
    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Check the password.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    // Generate a JWT token for the user.
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set the JWT token in the cookie.
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + parseInt(process.env.COOKIE_EXPIRY_TIME, 10)
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Return a successful response.
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Log out the user.
export const logout = (req, res, next) => {
  try {
    // Clear the JWT token from the cookie.
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
