var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: { type: String },
  password: { type: String, required: true, minlength: 6, trim: true },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Invalid email adddress",
    },
  },
  profileUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dtkgfy2wk/image/upload/v1620202579/vippng.com-empty-circle-png-4161690_reukek.png",
  },
});

ProfileSchema.statics.findAndValidate = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : false;
};

ProfileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

ProfileSchema.pre("updateOne", async function (next) {
  if (!this._update.password) return next();

  this._update.password = await bcrypt.hash(this._update.password, 10);
  next();
});

module.exports = mongoose.model("profile", ProfileSchema);
