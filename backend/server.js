

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");


const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/jobapplicationRoute"); 
const adminRoutes = require("./routes/adminRoutes"); 
const adminAddJobRoutes = require("./routes/adminAddJobRoutes"); 

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

connectDB()
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  });


app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes); 
app.use("/api/applications", applicationRoutes); 
app.use("/api/admin", adminRoutes); 
app.use("/api/admin/jobs", adminAddJobRoutes); 


app.get("/", (req, res) => {
  res.send("🚀 Welcome to DevHire Backend!");
});


app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
