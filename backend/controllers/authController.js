const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log("🟢 Received Login Request:", { email, password }); 

      const user = await User.findOne({ email });
      if (!user) {
          console.log("⚠️ User Not Found for Email:", email);
          return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log("✅ User Found:", user); 

      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log("❌ Password Does Not Match for User:", email);
          return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log("✅ Password Matched for User:", email);

      
      const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
      );

      console.log("🔐 Token Generated:", token); 

      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ message: "Server error" });
  }
};


const getUserDetails = async (req, res) => {
  try {
      console.log("✅ Sending User Data to Client:", req.user);
      res.status(200).json(req.user); 
  } catch (error) {
      console.error("❌ Error in /me route:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
}


module.exports = { registerUser, loginUser, getUserDetails };
