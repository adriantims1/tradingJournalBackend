const express = require("express");
const profileController = require("../controllers/profileController");
const { isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(profileController.login);
router.route("/logout").post(isLoggedIn, profileController.logout);
router.route("/").post(profileController.signup);
router.route("/").put(isLoggedIn, profileController.updateProfile);
router.route("/").delete(isLoggedIn, profileController.deleteUser);

module.exports = router;
