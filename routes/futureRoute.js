const express = require("express");
const futureController = require("../controllers/futureController");
const multer = require("multer");
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
const { isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(isLoggedIn, futureController.fetchAllfuturesByUserId);
router.route("/").post(futureController.addNewfuture);
router.route("/").delete(futureController.deletefutureById);
router
  .route("/picture")
  .post(upload.single("image"), futureController.uploadPicture);

module.exports = router;
