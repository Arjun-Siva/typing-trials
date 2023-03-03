const express = require("express");
// controller functions
const {getParagraph} = require("../controllers/paragraphController");

const router = express.Router();

router.get("/", getParagraph);

module.exports = router;