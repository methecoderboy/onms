const { Router } = require("express");
const { correctPassword } = require("../lib/helper");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const student = require("../models/student");
const teacher = require("../models/teacher");
const Admin = require("../models/admin");

const router = Router();

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

router.post("/login", async (req, res) => {
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

router.get("/logout", async (req, res) => {
  return res
    .status(200)
    .cookie("viby-token", "", {
      maxAge: 0,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    })
    .json({ success: true, message: "Logged out" });
});

router.use(isAuthenticated);

router.get("/profile", async (req, res) => {
  res.json({ success: true, message: "Profile", user: req.user });
});

router.post("/change-password", async (req, res) => {
  const { newPassword } = req.body;
  req.user.password = newPassword;
  await req.user.save();
  res.json({ success: true, message: "Password changed" });
});

module.exports = router;
