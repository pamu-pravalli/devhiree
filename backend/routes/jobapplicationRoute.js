const express = require("express");
const multer = require("multer");
const path = require("path");
const { applyJob, getUserAppliedJobs } = require("../controllers/jobapplicationController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });


router.post("/apply", upload.single("resume"), applyJob);

router.get("/user/:email", getUserAppliedJobs);

module.exports = router;
