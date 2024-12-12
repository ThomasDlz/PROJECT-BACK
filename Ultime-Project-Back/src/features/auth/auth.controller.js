import User from "../users/users.model.js";
import { UnauthenticatedError } from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation basique
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({ name, email, password });

    // Créer un token d'accès
    const token = user.createAccessToken();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user,
      token,
    });
  } catch (error) {
    console.error("Erreur dans le contrôleur d'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const login = async (req, res) => {
  const user = await usersService.get({ email: req.body.email });

  if (!user) throw new UnauthenticatedError("Identifiants invalides");

  const isPasswordCorrect = await user.comparePasswords(req.body.password);

  if (!isPasswordCorrect)
    throw new UnauthenticatedError("Idientifiants invalides");

  const token = user.createAccessToken();

  res.status(StatusCodes.OK).json({ user: { userId: user._id }, token });

  // Placer le token dans un cookie
  res.cookie("token", token, {
    httpOnly: true, // Empêche l'accès au cookie côté client
    secure: false, // À true en production avec HTTPS
    maxAge: 3600000, // Expire dans 1 heure
  });

  res.json({ message: "Login successful" });
};

export { login, register };
