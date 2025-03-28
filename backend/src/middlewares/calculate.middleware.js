// Middleware to calculate the total value of the user's card collection
export const calculateCollectionValue = async (req, res, next) => {
  try {
    // Get the updated user data from the request object
    const user = req.updatedData;
    // If user data is not found, pass an error to the next middleware
    if (!user) {
      return next(new Error("User data not found"));
    }

    // Initialize total value of the card collection
    let totalValue = 0;
    // Calculate the total value by iterating over each card in the collection
    user.cardCollection.forEach((card) => {
      totalValue += card.cardValue * card.quantity;
    });

    // Update the user's card collection value
    user.cardCollectionValue = totalValue;
    // Save the updated user data to the database
    await user.save();

    // Send a response with the updated user data
    res.status(200).json({
      success: true,
      message: "Successfully updated user's collection and calculated value",
      data: {
        cardCollection: user.cardCollection,
        cardCollectionValue: user.cardCollectionValue,
      },
    });
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
};

