const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

// Ruta de login
router.post("/login", authController.login);

// Ruta /current para obtener datos del usuario actual
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.json({
      message: "Usuario autenticado",
      user: req.user,
    });
  }
);

module.exports = router;
