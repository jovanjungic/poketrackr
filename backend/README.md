# PokeTrackr Backend API

A Pokemon collection tracking API built with Express.js and MongoDB.

## Prerequisites

Before running this application, you'll need to set up the following services:

### 1. MongoDB Database
Choose one option:

**Option A: MongoDB Atlas (Recommended - Free)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Start the MongoDB service

**Option C: Docker MongoDB**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 2. Pokemon TCG API Key
1. Go to [Pokemon TCG API](https://pokemontcg.io/)
2. Sign up for a free account
3. Get your API key

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
cp example.env .env
```

3. **Configure your environment variables:**
Edit the `.env` file with your actual values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `PKMN_API`: Your Pokemon TCG API key

4. **Start the development server:**
```bash
npm run dev
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5500) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRES_IN` | JWT token expiration time | No |
| `COOKIE_EXPIRY_TIME` | Cookie expiration in milliseconds | No |
| `PKMN_API` | Pokemon TCG API key | Yes |

## Security Note

Never commit your `.env` file to version control. The `.env` file is already included in `.gitignore` to prevent accidental commits.

## Lint

```
npm run lint
```

## Test

```
npm test
```

## Development

```
npm run dev
```
