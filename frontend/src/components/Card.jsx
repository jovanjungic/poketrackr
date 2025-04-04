import React from "react";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";

const Card = ({
  id,
  name,
  image,
  price,
  addButton = false,
  deleteButton = false,
}) => {
  const { user, addCardToCollection, deleteCardFromCollection, updateCollectionValue } = useAuthStore();

  const getCardQuantity = () => {
    const card = user.cardCollection.find((card) => card.cardId === id);
    return card ? card.quantity : 0;
  };

  const handleDeleteFromCollection = async () => {
    if (!user) {
      toast.error("You need to be logged in to remove cards.");
      return;
    }
    try {
      await axios.delete("http://localhost:5500/api/collection/", {
        data: { cardId: id },
        withCredentials: true,
      });

      deleteCardFromCollection(id);
      updateCollectionValue(); // Update value after removing a card
      toast.success(`${name} removed from your collection!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove card.");
    }
  };

  const handleAddToCollection = async () => {
    if (!user) {
      toast.error("You need to be logged in to add cards.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:5500/api/collection/",
        { cardId: id, cardValue: price },
        { withCredentials: true }
      );

      addCardToCollection({ cardId: id, cardValue: price });
      updateCollectionValue(); // Update value after adding a card
      toast.success(`${name} added to your collection!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add card.");
    }
  };

  return (
    <div className="p-4 border border-gray-600 rounded-lg shadow-lg bg-gray-800 text-center flex flex-col justify-center items-center">
      <img
        src={image}
        alt={name}
        className="h-auto object-cover mb-2 shadow-lg"
      />
      <h3 className="text-lg font-bold text-gray-100">{name}</h3>
      <p className="text-md font-medium text-gray-300">
        {price ? `$${price.toFixed(2)}` : "N/A"}
      </p>
      {addButton && (
        <button
          onClick={handleAddToCollection}
          className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition hover:cursor-pointer w-full"
        >
          Add to Collection
        </button>
      )}
      {deleteButton && (
        <div className="w-full flex sm:flex-row flex-col items-center justify-evenly">
          <p className="text-md font-medium text-gray-300">{getCardQuantity()} pc.</p>
          <button
            onClick={handleDeleteFromCollection}
            className="text-center mt-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition hover:cursor-pointer"
          >
            <Trash2 />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;