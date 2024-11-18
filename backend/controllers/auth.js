const { TryCatch } = require("../middlewares/error");
const student = require("../models/student");
const teacher = require("../models/teacher");
const Admin = require("../models/admin");
const { correctPassword } = require("../lib/helper");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

exports.login = TryCatch(async (req, res, next) => {
  const { email, rollnumber, password, role } = req.body;
  let user;
  if (role === "student") {
    user = await student.findOne({ rollnumber });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
  } else if (role === "teacher") {
    user = await teacher.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
  } else {
    user = await Admin.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
  }

  if (!correctPassword(password, user.password)) {
    return res.json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("onms-token", token, cookieOptions);
  res.json({
    success: true,
    message: "User logged in",
    user: user,
    role: user.role,
  });
});

exports.logout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("onms-token", "", {
      maxAge: 0,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    })
    .json({ success: true, message: "Logged out" });
});

exports.profile = TryCatch(async (req, res, next) => {
  res.json({ success: true, message: "Profile", user: req.user });
});

exports.changePassowrd = TryCatch(async (req, res, next) => {
  const { newPassword } = req.body;
  req.user.password = newPassword;
  await req.user.save();
  res.json({ success: true, message: "Password changed" });
});
