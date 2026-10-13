
# Calculator App

A full-stack calculator built with React, Vite, Node.js, and Express.

## Requirements

- Node.js LTS
- npm

## Run the backend

Open a terminal:

```bash
cd backend
npm install
npm run dev
```

The backend runs on http://localhost:5000.

## Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

http://localhost:5173

## API endpoint

POST /api/calculate

Example request:

```json
{
  "firstNumber": 10,
  "secondNumber": 5,
  "operation": "add"
}
```

Example response:

```json
{
  "result": 15
}
```

Supported operations:

- add
- subtract
- multiply
- divide

## Deployment

Deploy the backend and frontend separately.

Configure PORT and FRONTEND_URL in the backend hosting
environment. Configure VITE_API_URL in the frontend hosting
environment to point to the deployed backend URL.

Build the frontend using:

```bash
npm run build
```
