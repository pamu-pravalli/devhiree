const express = require("express");
const { registerUser, loginUser, getUserDetails } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser); 
router.get("/me", authMiddleware, getUserDetails); 


module.exports = router;
