const express = require("express");
const tradeController = require("../controllers/tradeController");

const router = express.Router();

router.route("/").get(tradeController.fetchAllTrades);
router.route("/").post(tradeController.addNewTrade);
router.route("/").delete(tradeController.deleteTradeById);

module.exports = router;
