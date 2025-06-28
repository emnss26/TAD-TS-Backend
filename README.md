# TAD TypeScript Backend

Simple Express server written in TypeScript used for Autodesk authentication flows.

## Prerequisites

- **Node.js** v18 or higher
- Create a `.env` file based on `.env.sample` and fill in the values:
  - `PORT` - port for the server
  - `NODE_ENV` - environment name (`development`, `production`, etc.)
  - `FRONTEND_URL` - URL of the frontend application
  - `APS_CLIENT_ID` - Autodesk client ID
  - `APS_CLIENT_SECRET` - Autodesk client secret
  - `REDIRECT_URI` - OAuth callback URL
  - `AUTODESK_BASE_URL` - base URL for Autodesk APIs
  - `THREE_LEGGED_TOKEN_SCOPES` - scopes for three-legged OAuth
  - `TWO_LEGGED_TOKEN_SCOPES` - scopes for two-legged OAuth

## Running locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Endpoints

- `GET /` – health check
- `GET /auth/three-legged` – OAuth three-legged callback
- `GET /auth/two-legged` – obtain two-legged token
- `GET /auth/logout` – clear authentication cookie
- `POST /auth/user-status` – check current user status
