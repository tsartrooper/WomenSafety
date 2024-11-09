const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

router.route("/sendFeedback").post(feedbackController.createFeedback);

router.route("/updateFeedback").patch(feedbackController.updateFeedback);

router.route("/getAllFeedback").get(feedbackController.getAllFeedback);

router
  .route("/checkFeedbackPresent")
  .post(feedbackController.checkFeedbackPresent);

module.exports = router;
