const express = require("express");
const profileController = require("../controllers/profileController");
const { isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(profileController.login);
router.route("/logout").post(isLoggedIn, profileController.logout);
router.route("/password").put(isLoggedIn, profileController.updatePassword);
router.route("/").post(profileController.signup);
router.route("/").put(isLoggedIn, profileController.updateProfilePictureOrName);
router.route("/").delete(isLoggedIn, profileController.deleteUser);
router.route("/session").get(profileController.checkSessionValid);

module.exports = router;
