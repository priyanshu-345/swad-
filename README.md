# Swad Slice - Pizza Time Fullstack

Simple fullstack pizza website with:

- Node/Express backend with JSON database, JWT auth, login/register/logout and profile update
- React frontend (Vite) with clean layout and simple class names
- Fully responsive pages (home, menu, auth, profile)
- Uses all existing images and videos from the original project

## Run locally

From the project root directory (`swad slice`):

```bash
# Install root dependencies
npm install

# Install frontend and backend dependencies
npm run install:all

# Run both frontend and backend
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:4000`

## Alternative Commands

- Run backend only: `npm run dev:backend`
- Run frontend only: `npm run dev:frontend`

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: JSON (lowdb)
- **Authentication**: JWT
