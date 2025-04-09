# PokeTrackr

PokeTrackr is a personal Pokémon TCG (Trading Card Game) collection tracker.  
Users can search for cards, add them to their collection, and view the total estimated value based on recent market data.

## 🚧 Status

This app is currently under development and not yet deployed.  
There are a few bugs and missing features that need to be resolved before hosting and deploying it.

## 🧪 Want to try it locally?

You're welcome to clone the repo and run the app on your own machine for testing or development purposes.

### Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)
- A `.env` file for backend config (e.g. database URI, JWT secret)

Here is a sample .env file.

---------------------------

#PORT
PORT = 5500
// Keep it as 5500 for the time being, will update this to be dynamic eventually.

#MONGODB
MONGODB_URI="YOUR_MONGODB_DATABASE"

# JWT AUTH
JWT_SECRET="YOUR_JWT_SECRET"
JWT_EXPIRES_IN="1d"

# COOKIE EXPIRY TIME
COOKIE_EXPIRY_TIME = 86400000

# POKEMON TCG API
PKMN_API="YOUR_API"

----------------------------
