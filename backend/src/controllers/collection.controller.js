// Controller for handling user's collection of Pokémon cards
import User from "../models/user.model.js";
import axios from "axios";
import { response } from "express";
import mongoose from "mongoose";

// PUT /api/collection
// Update item in user's collection
export const putCard = async (req, res, next) => {
  try {
    const { cardId, cardValue = 0 } = req.body;

    // Input validation
    if (!cardId || typeof cardId !== 'string' || cardId.trim().length === 0) {
      const error = new Error("Valid cardId is required");
      error.statusCode = 400;
      throw error;
    }

    if (typeof cardValue !== 'number' || cardValue < 0) {
      const error = new Error("Card value must be a non-negative number");
      error.statusCode = 400;
      throw error;
    }

    // If the card is already in the user's collection, increment its quantity
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id, "cardCollection.cardId": cardId },
      {
        $inc: { "cardCollection.$.quantity": 1 },
        $set: { "cardCollection.$.cardValue": cardValue },
      },
      { new: true }
    );

    // If the card is not in the user's collection, add it
    let usersNewCard;

    if (!updatedUser) {
      const newCard = { cardId, quantity: 1, cardValue: cardValue };
      usersNewCard = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { cardCollection: newCard } },
        { new: true }
      );
    }

    req.updatedData = updatedUser || usersNewCard;
    next();
  } catch (error) {
    next(error);
  }
};

// DELETE /api/collection
// Delete item from user's collection
export const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.body;

    // Input validation
    if (!cardId || typeof cardId !== 'string' || cardId.trim().length === 0) {
      const error = new Error("Valid cardId is required");
      error.statusCode = 400;
      throw error;
    }

    // Find the index of the card in the user's collection
    const user = await User.findById(req.user._id);
    const cardIndex = user.cardCollection.findIndex(
      (card) => card.cardId === cardId
    );

    // If the card is not found, throw an error
    if (cardIndex === -1) {
      const error = new Error("Card not found in collection");
      error.statusCode = 404;
      throw error;
    }

    // If the card has more than one quantity, decrement its quantity
    if (user.cardCollection[cardIndex].quantity > 1) {
      user.cardCollection[cardIndex].quantity -= 1;
    } else {
      // Otherwise, remove the card from the collection
      user.cardCollection.splice(cardIndex, 1);
    }
    await user.save();

    req.updatedData = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Function to fetch the current value of each card in the user's collection
const fetchCardValues = async (cards) => {
  const api = axios.create({
    baseURL: "https://api.pokemontcg.io/v2/cards",
    headers: {
      "X-Auth-Token": `${process.env.PKMN_API}`,
    },
  });

  // Map over the cards in the user's collection and fetch the current value of each
  const promises = cards.map(async (card) => {
    try {
      const response = await api.get(`/${card.cardId}`);
      const cardData = response.data?.data;
      
      if (!cardData) {
        console.warn(`No data found for card ${card.cardId}`);
        return {
          cardId: card.cardId,
          cardValue: card.cardValue || 0, // Keep existing value if API fails
        };
      }

      const avg7Price = cardData.cardmarket?.prices?.avg7;
      return {
        cardId: card.cardId,
        cardValue: avg7Price || card.cardValue || 0,
      };
    } catch (error) {
      console.warn(`Failed to fetch price for card ${card.cardId}:`, error.message);
      return {
        cardId: card.cardId,
        cardValue: card.cardValue || 0, // Keep existing value if API fails
      };
    }
  });
  return await Promise.all(promises);
};

// PUT /api/collection/
// Update the value of each card in the user's collection and recalculate the total value of the collection
export const updateCardValues = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(req.user._id).session(session);

    // Fetch the current value of each card in the user's collection
    const updatedCardValues = await fetchCardValues(user.cardCollection);

    // Update the value of each card in the user's collection
    updatedCardValues.forEach((updatedCard) => {
      const cardIndex = user.cardCollection.findIndex(
        (card) => card.cardId === updatedCard.cardId
      );
      if (cardIndex !== -1) {
        user.cardCollection[cardIndex].cardValue = updatedCard.cardValue;
      }
    });

    // Calculate the total value of the user's collection
    const totalValue = user.cardCollection.reduce((total, card) => {
      return total + card.cardValue * card.quantity;
    }, 0);

    user.cardCollectionValue = totalValue;
    await user.save({ session });

    // Commit the transaction and end the session
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message:
        "Successfully updated card values and recalculated collection worth",
      data: {
        cardCollection: user.cardCollection,
        cardCollectionValue: user.cardCollectionValue,
      },
    });
  } catch (error) {
    // Abort the transaction and end the session if an error occurs
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const retrieveSearchQuery = async (req, res, next) => {
  try {
    console.log(req.params.query)
    const url = `https://api.pokemontcg.io/v2/cards?q=name:"${req.params.query}"`;
    const response = await axios.get(url, {
      headers: {
        'X-Auth-Token': process.env.PKMN_API, // Ensure this API key is correct
      },
    });


    if (response.data && response.data.data) {
      res.status(200).json({
        success: true,
        message: "Successfully retrieved search query",
        data: response.data.data,
      });
    } else {
      console.log("No data found for query:", req.params.query);
      res.status(404).json({
        success: false,
        message: "No results found",
      });
    }


  } catch (error) {
    console.error("Error in fetching data from Pokemon API:", error.response || error); // Log the error
    next(error); // Pass the error to the error handler
  }
};

export const retrieveCardInfo = async (req, res, next) => {
  try {
    const { cardIds } = req.body; // Get the cardIds from the request body

    if (!Array.isArray(cardIds) || cardIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No card IDs provided',
      });
    }

    // Fetch card details for each cardId from the external API
    const cards = await Promise.all(
      cardIds.map(async (cardId) => {
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${cardId}`);
        const cardData = response.data.data; // Assume API returns an array

        // Assuming `avg7` is available in the external API response

        return {
          id: cardData.id,
          name: cardData.name,
          image: cardData.images?.small,
          avg7: cardData.cardmarket.prices.avg7 || 0
        };
      })
    );

    // Return the array of cards with their information
    res.status(200).json({
      success: true,
      message: 'Cards retrieved successfully',
      data: cards,
    });
  } catch (error) {
    console.error(error);
    next(error); // Forward error to error handler
  }
};