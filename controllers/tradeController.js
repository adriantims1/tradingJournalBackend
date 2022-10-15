const trade = require("./../models/tradeModel");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;

exports.fetchAllTradesByUserId = async (req, res) => {
  try {
    const allTrades = await trade.find({ userId: req.params.userId });
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
      data: "Check the trade detail",
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

exports.uploadPicture = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Trade Pictures",
    });
    res.status(201).json({
      status: "success",
      data: result.secure_url,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: "Fail uploading picture",
    });
  }
};
