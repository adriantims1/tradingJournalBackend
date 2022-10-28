const mongoose = require("mongoose");
require("mongoose-type-url");

var Schema = mongoose.Schema;

const futureSchema = Schema({
  userEmail: { type: String, required: [true, "userEmail is required"] },
  userId: { type: String, required: [true, "userId is required"] },
  timeframe: {
    type: String,
    enum: ["1m", "5m", "15m", "1h", "4h", "daily"],
    required: [true, "timeFrame is required"],
  },
  marketInformation: {
    type: String,
    required: [true, "marketInformation is required"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  takeProfitRatio: {
    type: Number,
    required: [true, "takeProfitRatio is required"],
  },
  profitOrLossValue: {
    type: Number,
    required: [true, "profitOrLossValue is required"],
  },
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
    required: [true, "levelInformation is required"],
  },
  indicatorSignalInformation: {
    type: String,
    enum: ["Single", "Double", "Triple", "None"],
    required: [true, "indicatorSignalInformation is required"],
  },
  ATR: { type: Number, required: [true, "ATR is required"] },
  breakInformation: {
    type: String,
    enum: ["Simple", "Two Candles", "Complex", "None"],
    required: [true, "breakInformation is required"],
  },
  entryScreenshot: {
    type: mongoose.SchemaTypes.Url,
    required: [true, "entryScreenshot is required"],
  },
  real: {
    type: Boolean,
    required: [true, "real is required"],
  },
});

futureSchema.virtual("day").get(() => {
  return this.timestamp.getDay();
});
futureSchema.virtual("time").get(() => {
  return this.timestamp.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
});

module.exports = mongoose.model("future", futureSchema);
