const trade = require("../models/futureModel");
const cloudinary = require("cloudinary").v2;

exports.fetchAllTradesByUserId = async (req, res) => {
  try {
    const allTrades = await trade.find({ userId: req.session.userId });
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
    const newTrade = new trade({ userId: req.session.userId, ...req.body });
    await newTrade.save();
    const allTrades = await trade.find({ userId: req.session.userId });
    res.status(201).json({
      status: "success",
      data: allTrades,
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
    const { entryScreenshot } = await trade.findOne({ id: req.body.Id });
    let parts = entryScreenshot.split("/");
    let publicId = parts[parts.length - 1].split(".")[0];
    await cloudinary.uploader.destroy(`Trade Pictures/${publicId}`);
    await trade.findOneAndDelete({ id: req.body.Id });
    const allTrades = await trade.find({ userId: req.session.userId });
    res.status(200).json({
      status: "success",
      data: allTrades,
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
