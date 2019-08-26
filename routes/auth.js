const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.status(201);
  res.send(token);
});

module.exports = router;
