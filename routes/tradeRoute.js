const express = require("express");
const tradeController = require("../controllers/tradeController");
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

const router = express.Router();

router.route("/:userId").get(tradeController.fetchAllTradesByUserId);
router.route("/").post(tradeController.addNewTrade);
router.route("/").delete(tradeController.deleteTradeById);
router
  .route("/picture")
  .post(upload.single("image"), tradeController.uploadPicture);

module.exports = router;
