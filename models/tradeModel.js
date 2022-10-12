const mongoose = require("mongoose");
require("mongoose-type-url");

var Schema = mongoose.Schema;

const tradeSchema = Schema({
  userEmail: { type: String, required: true },
  userId: { type: String, required: true },
  timeFrame: {
    type: String,
    enum: ["1m", "5m", "15m", "1h", "4h", "daily"],
    required: true,
  },
  marketInformation: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now, required: true },
  takeProfitRatio: { type: Number, required: true },
  profitOrLossValue: { type: Number, required: true },
  levelInformation: {
    type: String,
    enum: [
      "Trend Break",
      "Consolidation",
      "Limit",
      "Paranormal",
      "False Break",
      "Daily Highs and Lows",
      "Market Opening",
      "Mirroring",
      "Floating",
      "None",
    ],
    required: true,
  },
  indicatorSignalInformation: {
    type: String,
    enum: ["Single", "Double", "Triple", "None"],
    required: true,
  },
  ATR: { type: Number, required: true },
  breakInformation: {
    type: String,
    enum: ["Simple", "Two Candles", "Complex", "None"],
    required: true,
  },
  entryScreenshot: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
});

tradeSchema.virtual("day").get(() => {
  return this.Timestamp.getDay();
});
tradeSchema.virtual("time").get(() => {
  return this.Timestamp.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
});

module.exports = mongoose.model("trade", tradeSchema);
