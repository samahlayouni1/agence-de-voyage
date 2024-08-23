// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import userRoutesLogin from './routes/userRoutesLogin.js';

dotenv.config();

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Define API routes
app.use('/api/users', userRoutes); // Routes pour les utilisateurs
app.use('/api/auth', userRoutesLogin); // Routes pour l'authentification

// Fonction de connexion à MongoDB
export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connecté à MongoDB');
  } catch (err) {
    console.error('Erreur lors de la connexion à MongoDB', err);
    process.exit(1); // Quitter le processus en cas d'échec de connexion
  }
};

// Connexion à la base de données et démarrage du serveur
if (process.env.NODE_ENV !== 'test') {
  connectToDb().then(() => {
    app.listen(5000, () => {
      console.log("Serveur en cours d'exécution sur le port 5000");
    });
  });
}
