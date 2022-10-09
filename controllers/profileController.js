const profile = require("../models/profileModel");

exports.signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await profile.findOne({ email: email });
    console.log(user);
    if (user) {
      res.status(403).json({
        status: "fail",
        data: "Email exists",
      });
      return;
    }
    const newProfile = new profile({
      name,
      password,
      email,
    });
    await newProfile.save();
    req.session.userId = newProfile._id;
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      data: "Fail creating user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await profile.findAndValidate(email, password);
    if (!user) {
      res.status(404).json({
        status: "fail",
        data: "Email/Password combination does not exist",
      });
      return;
    }
    console.log(user);
    req.session.userId = user._id;
    res.status(200).json({
      email,
      name: user.name,
      profileUrl: user.profileUrl,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: "Fail logging in user",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.userId = null;
    await req.session.destroy();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: "Fail logging out user",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    await profile.updateOne(
      {
        _id: req.session.userId,
      },
      req.body
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      data: "Fail changing user profile picture",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await profile.findByIdAndDelete(req.session.userId);
    req.session.userId = null;
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: "Fail deleting user",
    });
  }
};
