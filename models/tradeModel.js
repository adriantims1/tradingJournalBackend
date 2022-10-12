const mongoose = require("mongoose");
require("mongoose-type-url");

var Schema = mongoose.Schema;

const tradeSchema = Schema({
  username: { type: String },
  timeframe: {
    type: String,
    enum: ["1m", "5m", "15m", "1h", "4h", "daily"],
  },
  marketInformation: { type: String },
  timestamp: { type: Date, default: Date.now },
  takeProfitRatio: { type: Number },
  profitOrLossValue: { type: Number },
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
  },
  indicatorSignalInformation: {
    type: String,
    enum: ["Single", "Double", "Triple", "None"],
  },
  ATR: { type: Number },
  breakInformation: {
    type: String,
    enum: ["Simple", "Two Candles", "Complex", "None"],
  },
  entryScreenshot: {
    type: mongoose.SchemaTypes.Url,
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
