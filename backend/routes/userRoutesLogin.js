// routes/userRoutesLogin.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Veuillez fournir un nom d'utilisateur et un mot de passe" });
        }
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        res.status(200).json({ message: "Connexion réussie" });
    } catch (error) {
        console.error("Erreur lors de la connexion", error);
        res.status(500).json({ error: "Erreur de connexion" });
    }
});

export default router;