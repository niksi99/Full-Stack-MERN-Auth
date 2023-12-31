const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController')

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.post("/google", AuthController.GoogleOath);
module.exports = router;