# Cloud Meditation

Une application web de méditation de 60 secondes avec une symbolique bouddhiste. L'utilisateur peut écrire une pensée qui le pèse et la laisser s'envoler avec les nuages.

## Fonctionnalités

- Animation de nuages flottants dans un ciel nocturne
- Interface pour saisir une pensée
- Visualisation de la pensée dans un nuage
- Animations fluides avec GSAP et CSS

## Stack technique

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

### Prérequis
- Node.js >= 18
- MongoDB (optionnel, pour le serveur)

### Client

```bash
cd client
npm install
npm run dev
```

Le client sera accessible sur `http://localhost:5173`

### Server

```bash
cd server
npm install
npm run dev
```

## Scripts disponibles

### Client
- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build pour la production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint

### Server
- `npm run dev` - Démarre le serveur avec hot-reload
- `npm run build` - Compile TypeScript
- `npm run start` - Démarre le serveur compilé

## Structure du projet

```
cloud-meditation/
├── client/
│   ├── public/          # Assets statiques (images, SVG)
│   └── src/
│       ├── components/  # Composants React
│       ├── hooks/       # Custom hooks
│       ├── styles/      # Fichiers CSS
│       └── config/      # Configuration (nuages, etc.)
└── server/
    └── src/             # Code serveur Express
```
