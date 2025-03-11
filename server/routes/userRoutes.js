import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { userValidation } from "../models/User.js";

const router = express.Router();

// Middleware de validation pour l'inscription
const validateRegister = (req, res, next) => {
  const { error } = userValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Route d'inscription
router.post("/register", validateRegister, registerUser);

// Route de connexion
router.post("/login", loginUser);

// Route protégée pour récupérer les infos de l'utilisateur connecté
router.get("/me", authMiddleware, getUser);

// Route protégée pour récupérer tous les utilisateurs (nécessite un rôle admin, par exemple)
router.get("/users", authMiddleware, getAllUsers);

export default router;