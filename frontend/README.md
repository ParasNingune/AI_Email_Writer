# AI Email Writer - Frontend

React + Vite frontend for the AI Email Writer application.

## Features

- 🎨 Modern UI with Material-UI
- ⚡ Fast development with Vite
- 🔄 Real-time email generation
- 🎭 Tone customization
- 📋 Copy to clipboard functionality
- 🌓 Dark theme design

## Tech Stack

- React 19
- Vite 7
- Material-UI (MUI)
- Axios for API calls

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` to set your backend URL (defaults to `http://localhost:8080`):

```env
VITE_API_URL=http://localhost:8080
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### API URL

The frontend connects to the backend API. You can configure the API URL in two ways:

1. **Environment Variable** (recommended):
   ```env
   VITE_API_URL=http://localhost:8080
   ```

2. **Direct in config** (`src/config.js`):
   ```javascript
   const API_CONFIG = {
     baseURL: 'http://localhost:8080',
   };
   ```

### Proxy

Vite is configured to proxy `/api` requests to the backend during development. This is configured in `vite.config.js`.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

Make sure to set the `VITE_API_URL` environment variable in Vercel to your production backend URL.

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

Set the `VITE_API_URL` environment variable in Netlify settings.

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── config.js        # API configuration
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: `http://localhost:8080`)

## Troubleshooting

### Cannot connect to backend

1. Make sure the backend is running on the configured port
2. Check the `VITE_API_URL` in your `.env` file
3. Restart the dev server after changing environment variables

### CORS errors

The backend has CORS enabled. Make sure you're using the correct backend URL.

### Build errors

Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

MIT+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
