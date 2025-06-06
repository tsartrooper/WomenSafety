const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router({ mergeParams: true });

router.route("/createUser").post(userController.createNewUser);

router.route("/getUser/:userId").get(userController.getUser);

router.route("/updateUser/:userId").patch(userController.updateUser);

router.route("/allUsers").get(userController.getAllUsers);

router.route("/deleteUser/:userId").delete(userController.deleteUser);

router.route("/signUp").post(userController.signUp);
router.route("/verifyOtp").post(userController.verifyOtp);
router.route("/resendOtp/:phoneNumber").get(userController.resendotp);

router.route("/logIn").post(userController.logIn);
router.route("/addGuardian").patch(userController.updateGuardian);

router
  .route("/addAudioAndVideo/:userId")
  .patch(userController.addAudioAndVideo);

router
  .route("/gurdianWithPhoneNUmber")
  .post(userController.getGuardiansWithNumber);

router.route("/allGuardianNumber").post(userController.getAllGuardianNumber);

router.route("/deleteGuardian/:userId").delete(userController.deleteGuardian);
module.exports = router;
