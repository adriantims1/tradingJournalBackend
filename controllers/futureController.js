const future = require("../models/futureModel");
const cloudinary = require("cloudinary").v2;

exports.fetchAllFuturesByUserId = async (req, res) => {
  try {
    const allfutures = await future.find({ userId: req.session.userId });
    res.status(200).json({
      status: "success",
      data: allfutures,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: "Fetching All future Fails",
    });
  }
};

exports.addNewFuture = async (req, res) => {
  try {
    const newfuture = new future({ userId: req.session.userId, ...req.body });
    await newfuture.save();
    const allfutures = await future.find({ userId: req.session.userId });
    res.status(201).json({
      status: "success",
      data: allfutures,
    });
  } catch (errors) {
    console.log(errors);
    res.status(400).json({
      status: "fail",
      data: "Check the future detail",
    });
  }
};

exports.deleteFutureById = async (req, res) => {
  try {
    const { entryScreenshot } = await future.findOne({ id: req.body.Id });
    let parts = entryScreenshot.split("/");
    let publicId = parts[parts.length - 1].split(".")[0];
    await cloudinary.uploader.destroy(`future Pictures/${publicId}`);
    await future.findOneAndDelete({ id: req.body.Id });
    const allfutures = await future.find({ userId: req.session.userId });
    res.status(200).json({
      status: "success",
      data: allfutures,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: "Check the future id",
    });
  }
};

exports.uploadPicture = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Future Pictures",
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
