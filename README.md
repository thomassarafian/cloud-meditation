# Cloud Meditation
[Access to website](https://cloud-meditation.vercel.app/)<br><br>
A 60-second meditation web app with Buddhist symbolism. Users can write down a thought that weighs on them and let it drift away with the clouds.

## Features

- Animated floating clouds in a night sky
- Interface to enter a thought
- Thought visualization inside a cloud
- Smooth animations with GSAP and CSS

## Tech Stack

### Client
- React 19
- TypeScript
- Vite
- GSAP (animations)

### Server
- Express 5
- TypeScript
- MongoDB (Mongoose)

## Installation

### Prerequisites
- Node.js >= 18
- MongoDB (optional, for server)

### Client

```bash
cd client
npm install
npm run dev
```

The client will be available at `http://localhost:5173`

### Server

```bash
cd server
npm install
npm run dev
```

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

### Server
- `npm run dev` - Start server with hot-reload
- `npm run build` - Compile TypeScript
- `npm run start` - Start compiled server

## Project Structure

```
cloud-meditation/
├── client/
│   ├── public/          # Static assets (images, SVG)
│   └── src/
│       ├── components/  # React components
│       ├── hooks/       # Custom hooks
│       ├── styles/      # CSS files
│       └── config/      # Configuration (clouds, etc.)
└── server/
    └── src/             # Express server code
```
