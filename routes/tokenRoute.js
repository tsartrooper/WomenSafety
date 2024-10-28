const express = require("express");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

router.route("/addToken").post(tokenController.addOrUpdateFCMToken);

module.exports = router;