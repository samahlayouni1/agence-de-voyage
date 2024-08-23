import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; // Import bcrypt pour le hachage des mots de passe
import { usersData } from "./data.js"; // Import des données utilisateurs
import User from "./models/User.js"; // Import du modèle utilisateur
import { connectToDb } from "./server.js"; // Import de la fonction de connexion à la base de données

dotenv.config();

const importUser = async () => {
  try {
    await connectToDb();

    // Hachage des mots de passe et création des utilisateurs
    const usersWithHashedPasswords = await Promise.all(
      usersData.map(async (user) => {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const hashedPassword = await bcrypt.hash(user.password, 10); // Hachage du mot de passe avec bcrypt
          return { ...user, password: hashedPassword }; // Retourne l'utilisateur avec le mot de passe haché
        }
        return null;
      })
    );

    // Filtrez les utilisateurs non nuls avant l'insertion
    const filteredUsers = usersWithHashedPasswords.filter(user => user !== null);

    if (filteredUsers.length > 0) {
      await User.insertMany(filteredUsers); // Insère les utilisateurs avec les mots de passe hachés
      console.log("Utilisateurs importés avec succès");
    } else {
      console.log("Aucun nouvel utilisateur à importer.");
    }

    process.exit();
  } catch (error) {
    console.error("Erreur lors de l'importation des utilisateurs", error);
    process.exit(1);
  }
};

// Vérifie les arguments de la ligne de commande
if (process.argv[2] === "-import") {
  importUser();
} else {
  console.log("Argument inconnu, utilisez '-import' pour importer des utilisateurs");
  process.exit(1);
}
