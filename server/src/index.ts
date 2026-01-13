import express from "express";
import cors from "cors";

const app = express();

console.log(">>> Serveur Express chargé <<<");

// ACTIVE CORS
app.use(
  cors({
    origin: "*",
  })
);

// PARSING
app.use(express.json());

// ROUTE DE TEST
app.get("/", (req, res) => {
  console.log(">>> Requête GET / reçue <<<");
  res.status(200).send("API OK 🔥");
});

// DÉMARRAGE SERVEUR
const PORT = 8000;
app.listen(PORT, () => console.log("Serveur démarré sur le port", PORT));
