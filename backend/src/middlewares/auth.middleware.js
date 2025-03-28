// Middleware used to check if the user is logged in, and if the user is logged in, get his ID from the token
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
  try {
    let token;

    // Check if the authorization header has a valid bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if the token exists in cookies
    if (!token && req.cookies.token) {
      token = req.cookies.token; 
    }

    // If no token is provided or invalid, redirect to login
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or no token - please login",
      });
    }

    // Verify the token and get the user from the database
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    // If the user does not exist, redirect to register
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access - no user with this token, or expired token",
      });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    // If there is a problem with the token or the user, return an error
    next(error);
  }
};
