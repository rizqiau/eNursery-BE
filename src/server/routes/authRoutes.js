const express = require("express");
const router = express.Router();
const authHandler = require("../handler/authHandler");

// Endpoints untuk auth
router.post("/register", authHandler.register);
router.post("/login", authHandler.login);

module.exports = router;
