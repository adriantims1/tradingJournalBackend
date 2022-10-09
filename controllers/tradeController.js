const trade = require("./../models/tradeModel");

exports.fetchAllTrades = async (req, res) => {
  try {
    const allTrades = await trade.find();
    res.status(200).json({
      status: "success",
      data: allTrades,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: "Fetching All Trade Fails",
    });
  }
};

exports.addNewTrade = async (req, res) => {
  try {
    const newTrade = new trade(req.body);
    await newTrade.save();
    res.status(201).json({
      status: "success",
    });
  } catch (errors) {
    res.status(400).json({
      status: "fail",
      data: "Check the request argument",
    });
  }
};

exports.deleteTradeById = async (req, res) => {
  try {
    await trade.findOneAndDelete({ id: req.body.Id });
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: "Check the trade id",
    });
  }
};