import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { emotion } from "../models/emotion.js"; // Assure-toi que le chemin est correct

// Connexion à MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/diary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error(" Erreur de connexion à MongoDB :", err));

// Liste des émotions à insérer
const emotionNames = [
  "Joie",
  "Tristesse",
  "Colère",
  "Surprise",
  "Peur",
  "Dégoût",
  "Excitation",
  "Calme",
  "Amour",
  "Honte",
];

const seedEmotions = async () => {
  try {
    await emotion.deleteMany(); // Supprime les anciennes données pour éviter les doublons

    const emotions = emotionNames.map((name) => ({
      name,
      icon: faker.image.avatar(), // Génère une icône aléatoire
    }));

    await emotion.insertMany(emotions);
    console.log(" Emotions insérées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'insertion des émotions :", error);
  } finally {
    mongoose.connection.close(); // Ferme la connexion après insertion
  }
};

// Exécuter le script
seedEmotions();
