// This function retrieves the user data from the database based on the user's ID stored in the request object
// It returns a JSON response with a success message and the user data
import User from "../models/user.model.js";

export const getUser = async (req, res, next) => {
    try {
        // Find the user by their ID
        const user = await User.findById(req.user._id);
        // Return a successful response with the user data
        res.status(200).json({success: true, message: "Successfully got user", data: {id: user._id, username: user.username, email: user.email}});
    } catch (error) {
        // If an error occurs, pass it to the next middleware
        next(error);
    }
};

