# 🎮 PokeTrackr

A Pokemon card collection tracker built with the MERN stack. It's a learning project that focuses more on backend development than frontend polish. Track your Pokemon TCG collection, monitor card values, and manage your inventory.

**⚠️ Fair Warning**: This is a work-in-progress project. The backend is solid, but the frontend could use some love. There are also way too many API calls happening (Redis caching would be a great addition).

![Pokemon](https://img.shields.io/badge/Pokemon-TCG-red?style=for-the-badge&logo=pokemon)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## ✨ What It Does

- 🔐 **User Authentication** - Login/register with JWT tokens (works pretty well)
- 🃏 **Card Collection Management** - Add, remove, and track Pokemon cards
- 💰 **Value Tracking** - Gets prices from Pokemon TCG API (maybe too often...)
- 🔍 **Card Search** - Search for Pokemon cards (basic functionality)
- 📊 **Collection Value** - Shows total collection worth
- 📱 **Responsive-ish** - Works on desktop, mobile is... functional
- ⚡ **Real-time-ish** - Updates without refresh (most of the time)

## 🚧 Known Issues & Future Improvements

- **Too many API calls** - Seriously, Redis caching would be amazing here
- **Frontend needs work** - I focused more on backend logic than UI polish
- **Error handling** - Could be more robust
- **Performance** - Some operations could be optimized
- **Mobile experience** - Works but could be better
- **Rate limiting** - Not implemented (probably should be)

## 🏗️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 🚀 Getting Started

### What You'll Need

1. **Node.js** (v18 or higher) - You probably already have this
2. **MongoDB** - Either install locally or use MongoDB Atlas (free tier works fine)
3. **Pokemon TCG API Key** - Free at [pokemontcg.io](https://pokemontcg.io/) (takes 2 minutes)

### Setup (It's Pretty Straightforward)

1. **Clone this thing**
   ```bash
   git clone <your-repo-url>
   cd poketrackr
   ```

2. **Install stuff**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up your environment**
   ```bash
   cd ../backend
   cp example.env .env
   # Now edit .env with your actual values (see below)
   ```

4. **Start both servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend  
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5500 (you probably won't need this)

## 📁 Project Structure

```
poketrackr/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   └── lib/           # Database connection
│   ├── package.json
│   └── .env               # Environment variables
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # State management
│   │   └── App.jsx       # Main app component
│   └── package.json
└── README.md
```

## 🔧 Environment Setup

### Your `.env` File

Copy `example.env` to `.env` and fill in the blanks:

```env
# Server Configuration
PORT=5500

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/poketrackr
# OR for MongoDB Atlas (recommended):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/poketrackr

# JWT Configuration (make this random and long)
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=1d
COOKIE_EXPIRY_TIME=86400000

# Pokemon TCG API (get this from pokemontcg.io)
PKMN_API=your_pokemon_tcg_api_key_here
```

**Pro tip**: Use MongoDB Atlas - it's free and you don't have to install MongoDB locally.

### MongoDB Options

**Option 1: MongoDB Atlas (Easier)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up (free)
3. Create a cluster (free tier is fine)
4. Get your connection string
5. Paste it in your `.env` file

**Option 2: Local MongoDB (More Setup)**
```bash
# Install MongoDB locally
sudo apt install mongodb  # or however you install stuff on your system
sudo systemctl start mongodb
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status

### Collection
- `GET /api/collection` - Get user's collection with current values
- `PUT /api/collection` - Add/update card in collection
- `DELETE /api/collection` - Remove card from collection
- `GET /api/collection/:query` - Search for cards
- `PUT /api/collection/cardInfo` - Get detailed card information

### User
- `GET /api/user` - Get user profile

## 🛠️ Running the Project

### Backend
```bash
cd backend
npm run dev    # Start with nodemon (auto-restart on changes)
npm run lint   # Check for code issues
```

### Frontend
```bash
cd frontend
npm run dev    # Start Vite dev server (fast hot reload)
npm run lint   # Check for code issues
```

**Note**: The backend is more polished than the frontend. I spent more time on the API logic than the UI.


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

---

Built as a learning project. The backend is solid-ish, the frontend... works.