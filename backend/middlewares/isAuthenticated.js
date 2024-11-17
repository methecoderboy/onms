const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Admin = require("../models/admin");
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["onms-token"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Login" });
  }
  let user;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  user = await Admin.findById(id);

  if (!user) {
    user = await Teacher.findById(id);

    if (!user) {
      user = await Student.findById(id);

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized Access" });
      }
    }
  }
  req.user = user;
  next();
};

module.exports = { isAuthenticated };
