const express = require("express");
const { adminAddJob } = require("../controllers/adminAddJobController");

const router = express.Router();

router.post("/add", adminAddJob);

module.exports = router;
