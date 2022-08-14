const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const { register, login } = require("../models/users.model");

router.get("/verify", auth, (req, res) => {
  return res.send({
    success: true,
    data: { username: req.user.username, id: req.user.id },
    error: null,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");

  return res.send({ success: true, data: null, error: null });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!verifyData(username, password)) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }

  const resObj = await login(username, password);
  if (resObj.success) {
    const user = resObj.data;

    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "2 days",
    });

    res.cookie("jwt", token, { httpOnly: true });
  }
  res.send(resObj);
});

router.put("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!verifyData(username, password)) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }
  const resObj = await register(username, password);

  res.send(resObj);
});

function verifyData(username, passpord) {
  if (!username || username.length < 4 || username.length > 20) {
    return false;
  }

  if (!password || password.length < 8 || passpord.length > 30) {
    return false;
  }
  return true;
}

module.exports = router;
