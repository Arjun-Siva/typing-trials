const express = require("express");
const router = express.Router();
const { joinArena, createArena} = require("../controllers/arenaController");


router.post("/join", joinArena);
router.post("/create", createArena);

module.exports = router;