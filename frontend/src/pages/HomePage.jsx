import React from "react";
import { useAuthStore } from "../store/authStore";
import MyHeader from "../components/MyHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../components/Card";
import { X } from "lucide-react";

const HomePage = () => {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [collectionValue, setCollectionValue] = useState();

  const fetchFromApi = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/collection/${query}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Error fetching data");
      return [];
    }
  };

   const showCurrentCards = async () => {     
    try {
        const cardArray = () => {
            const cardIds = user.cardCollection.map(card => card.cardId); // Extract all card IDs
             return cardIds;
            }
                console.log(user.cardCollection)
                console.log(cardArray());
             const response = await axios.put("http://localhost:5500/api/collection/cardInfo", {
                cardIds: cardArray(),
             }, {
                withCredentials: true,
             });
             setCardInfo(response.data.data);
             console.log(response.data.data);
    } catch (error) {
        console.error(error)
        toast.error(error.response.data.message || "Error fetching data")
    }
};

useEffect(() => {
    if (user?.cardCollection.length > 0) {
      showCurrentCards();
    }
    setCollectionValue(user.cardCollectionValue.toFixed(2) + "$");
  }, [user?.cardCollection, user.cardCollectionValue]); // Removed collectionValue, added showCurrentCards

useEffect(() => {
    if (user?.cardCollection) {
      setCollectionValue(user.cardCollection.reduce(
        (acc, card) => acc + card.cardValue * card.quantity, 0
      ).toFixed(2) + "$");
    }
  }, [user.cardCollection]); // Fix dependency

  // This will update the debounced search query after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Debounce delay (500ms)

    // Cleanup the timeout if the user types before the delay is over
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // This effect will trigger when the debounced search query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      // Call your search function here with the debounced search query
      // For example, simulate fetching search results:
      const fetchSearchResults = async () => {
        // Replace with your API call or search logic
        const results = await fetchFromApi(debouncedSearchQuery);
        setSearchResults(results);
        console.log(results);
      };
    
      fetchSearchResults();
    } else {
      // If the search query is empty, clear results
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  return (
    <div className="bg-gray-900 text-gray-200">
      <MyHeader />
      <div className="w-[80%] mx-auto bg-gray-800 p-6 min-h-screen border-4 border-t-0 border-gray-700 rounded-md shadow-lg">
        {/* Top Section */}
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-semibold text-gray-100 hidden md:block">
            Total Collection Value: {collectionValue}
          </h2>
          <h2 className="text-2xl font-semibold text-gray-100 md:hidden">
            {collectionValue}
          </h2>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search cards..."
              className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg hover:cursor-pointer hover:text-gray-200"
              >
                <X />
              </button>
            )}
          </div>
        </div>
  
        {/* Search Results Section with Grid Layout */}
        {debouncedSearchQuery && (
          <div
            className="p-5 bg-gray-700 rounded-lg border border-gray-600 mt-7 opacity-0 transform transition-all duration-500 ease-in-out"
            style={{
              animation: "fadeIn 0.5s forwards, slideDownSearch 0.5s forwards",
              maxHeight: "750px", // Increased from 500px → 750px (1.5x)
              height: "auto",
              paddingBottom: "16px",
            }}
          >
            <div
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 overflow-y-auto scrollbar-thin text-gray-100"
              style={{
                maxHeight: "600px", // Increased from 400px → 600px (1.5x)
                paddingBottom: "8px",
              }}
            >
              {searchResults.map((card) => (
                <Card
                  id={card.id}
                  name={card.name}
                  image={card.images.small}
                  price={card.cardmarket?.prices?.avg7}
                  addButton={true}
                />
              ))}
            </div>
          </div>
        )}
  
        {/* Your Cards Section */}
        <div className="mt-6 p-6 bg-gray-700 rounded-lg border-2 border-gray-600">
          <h2 className="text-2xl font-extrabold text-gray-100 tracking-wide">
            YOUR CARDS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-4">
            {cardInfo.map((card) => (
              <Card
                id={card.id}
                name={card.name}
                image={card.image}
                price={card.avg7}
                deleteButton={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
