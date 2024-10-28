const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, "your_jwt_secret_key", { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
