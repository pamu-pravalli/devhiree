
const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const { getAllAppliedJobs, updateApplicationStatus } = require("../controllers/jobapplicationController");

const router = express.Router();


router.post("/register", registerAdmin);


router.post("/login", loginAdmin);


router.get("/appliedjobs", getAllAppliedJobs);

router.put("/appliedjobs/update/:id", updateApplicationStatus);

module.exports = router;
