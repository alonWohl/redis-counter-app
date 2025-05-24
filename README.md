# Redis Counter App

A fullstack application demonstrating Redis state management with Node.js/Express backend and React frontend.

## Features

- **Increment Counter**: Non-idempotent endpoint that increments a Redis counter
- **Set-Once Counter**: Idempotent endpoint that sets a value only once
- **Real-time Dashboard**: Shows request metrics and current values
- **Request Tracking**: Monitors API usage per endpoint

## Setup

### Prerequisites

- Node.js (v18+)
- Redis server running on localhost:6379

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Usage

1. Visit http://localhost:5173 for the frontend
2. API available at http://localhost:3030/api/counter
3. Use the dashboard to monitor metrics and test endpoints

## API Endpoints

- `POST /api/counter/increment` - Increment counter
- `POST /api/counter/set-once` - Set value once (idempotent)
- `GET /api/counter/dashboard` - Get metrics
