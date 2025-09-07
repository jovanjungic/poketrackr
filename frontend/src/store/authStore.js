import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// API base URL - can be moved to environment variables later
const API_BASE_URL = "http://localhost:5500";

export const useAuthStore = create((set) => ({
  user: null,
  isRegistering: false,
  isCheckingAuth: true,
  isLoggingIn: false,
  isLoggingOut: false,
  register: async (credentials) => {
    set({ isRegistering: true });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        credentials,
        { withCredentials: true }
      );
      set({ user: response.data.data.user, isRegistering: false });
      console.log(response);
      toast.success("User registered successfully");
      return true;
    } catch (error) {
      toast.error(error.response.data.message || "Error registering user");
      set({ isRegistering: false, user: null });
      return false;
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        credentials,
        { withCredentials: true }
      );
      set({ user: response.data.data.user, isLoggingIn: false });
      toast.success("User logged in successfully");
      console.log(response);
      return true;
    } catch (error) {
      toast.error(error.response.data.message || "Error logging in");
      set({ isLoggingIn: false, user: null });
      return false;
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.get(`${API_BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Error logging out");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/check`, {
        withCredentials: true,
      });
      set({ user: response.data.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
      console.error(error);
    }
  },
  addCardToCollection: (newCard) =>
    set((state) => {
      if (!state.user) return state;
      
      const existingCardIndex = state.user.cardCollection.findIndex(
        (card) => card.cardId === newCard.cardId
      );

      let updatedCollection;
      if (existingCardIndex !== -1) {
        // If card exists, update quantity
        updatedCollection = [...state.user.cardCollection];
        updatedCollection[existingCardIndex].quantity += 1;
        updatedCollection[existingCardIndex].cardValue = newCard.cardValue;
      } else {
        // If card is new, add it
        updatedCollection = [
          ...state.user.cardCollection,
          { ...newCard, quantity: 1 },
        ];
      }

      // Recalculate collection value
      const newValue = updatedCollection.reduce(
        (acc, card) => acc + (card.cardValue || 0) * card.quantity, 0
      );

      return {
        user: {
          ...state.user,
          cardCollection: updatedCollection,
          cardCollectionValue: newValue,
        },
      };
    }),
  deleteCardFromCollection: (cardId) =>
    set((state) => {
      if (!state.user) return state;

      const updatedCollection = state.user.cardCollection.map((card) =>
        card.cardId === cardId ? { ...card, quantity: card.quantity - 1 } : card
      );

      // Filter out cards with zero quantity
      const filteredCollection = updatedCollection.filter(
        (card) => card.quantity > 0
      );

      // Recalculate collection value
      const newValue = filteredCollection.reduce(
        (acc, card) => acc + (card.cardValue || 0) * card.quantity, 0
      );

      return {
        user: {
          ...state.user,
          cardCollection: filteredCollection,
          cardCollectionValue: newValue,
        },
      };
    }),

  updateCollectionValue: () =>
    set((state) => {
      const newValue = state.user.cardCollection.reduce(
        (acc, card) => acc + card.cardValue * card.quantity, // Total value of each card
        0
      );
      return { user: { ...state.user, cardCollectionValue: newValue } };
    }),
}));
