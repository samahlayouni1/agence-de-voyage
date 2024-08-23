// routes/userRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';


const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Veuillez fournir tous les champs requis" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Enregistrement réalisé avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement", error);
        res.status(500).json({ error: "Erreur d'enregistrement" });
    }
});

export default router;