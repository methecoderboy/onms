const { Router } = require("express");
const User = require("../models/user");
const { correctPassword } = require("../lib/helper");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const student = require("../models/student");
const teacher = require("../models/teacher");
const Admin = require("../models/admin");

const router = Router();

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
  res.cookie("onms-token", token, { httpOnly: true });
  res.json({
    success: true,
    message: "User logged in",
    user: user,
    role: user.role,
  });
});

//   console.log(email, password);
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ success: false, message: "User not found" });
//   }
//   if (!correctPassword(password, user.password)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid password" });
//   }
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.cookie("onms-token", token, {
//     httpOnly: true,
//   });
//   res.json({ success: true, message: "User logged in", user: user });
// });

// router.use(isAuthenticated);

// router.use((req, res, next) => {
//   const token = req.cookies["onms-token"];
//   if (!token) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   console.log(decoded);
//   next();
// });

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
