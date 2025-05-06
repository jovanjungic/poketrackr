# 🧩 Pokémon TCG Collection Tracker (MERN Stack)

This is a full-stack MERN application for tracking your personal Pokémon TCG card collection. It lets users log in, search for cards using an external API, and save the ones they own, along with quantities and value estimates.

It is still a big work in progress, i realize the issues I have made only after finishing most of the app. It makes too many requests to an external API, I can cut it down, and I will, and also the UI is still a huge work in progress, while it does work it will need work to make it prettier.

---

## 🌟 Features

- 🔐 JWT authentication (login/register)
- 🧠 Zustand for frontend state management
- 📦 Add cards to your collection with quantity tracking
- 💰 Automatically calculates total collection value
- 🔎 Search functionality 
- 🌐 Uses external Pokémon TCG API
- ⚙️ Custom backend API with protected routes
- 🪄 Clean UI with responsive design

---

## 📦 Tech Stack

**Frontend:** React, Zustand, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt  
**External API:** [Pokémon TCG API](https://pokemontcg.io/)

---

## 🛠️ Getting Started

To run the project locally, follow these steps:


#### 1. Clone the repository
```
git clone https://github.com/yourusername/pokemon-tcg-tracker.git
cd pokemon-tcg-tracker
```

#### 2. Install backend dependencies
```
cd backend
npm install
```

#### 3. Install frontend dependencies
```
cd ../frontend
npm install
```

#### 4. Set up environment variables
There is a example env file in the project that will guide you.

#### 5. Start the backend
```
cd ../backend
npm run dev
```
#### 6. Start the frontend (in a separate terminal)
```
cd ../frontend
npm run dev
```
