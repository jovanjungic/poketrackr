import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import {
  deleteCard,
  putCard,
  updateCardValues,
  retrieveSearchQuery,
  retrieveCardInfo,
} from "../controllers/collection.controller.js";
import { calculateCollectionValue } from "../middlewares/calculate.middleware.js";

const router = Router();

router.get("/", authorize, updateCardValues); // Get user's collection, including current value and quantity of each card
router.get("/:query", authorize, retrieveSearchQuery); // Retrieve search query
router.put("/", authorize, putCard, calculateCollectionValue); // Update item in user's collection
router.delete("/", authorize, deleteCard, calculateCollectionValue); // Delete item from user's collection
router.put("/cardInfo", authorize, retrieveCardInfo);

export default router;
