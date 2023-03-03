const express = require("express");
const { getScores, createScore, deleteScore} = require("../controllers/scoreController");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getScores);
router.post("/", createScore);
router.delete("/:id", deleteScore);

module.exports = router;