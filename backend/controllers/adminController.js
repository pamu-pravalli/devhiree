const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");


exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;


    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, admin });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
