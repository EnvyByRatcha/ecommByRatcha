const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

app.post("/signIn", async (req, res) => {
  try {
    if (req.body.username == undefined || req.body.password == undefined) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const user = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
      },
      where: {
        username: req.body.username,
        password: req.body.password,
        status: "use",
      },
    });

    if (user != null) {
      const secret = process.env.TOKEN_SECRET;
      const token = jwt.sign(user, secret, { expiresIn: "1d" });

      return res.send({ token: token });
    }

    res.status(401).send({ message: "Unauthorized" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = app;
