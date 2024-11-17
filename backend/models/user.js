// const { Schema, model } = require("mongoose");
// const bcrypt = require("bcryptjs");

// const schema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     rollnumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     department: {
//       type: String,
//       enum: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"],
//     },
//     sememster: {
//       type: Number,
//       required: true,
//     },
//     section: {
//       type: String,
//       enum: ["A", "B", "C", "D"],
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       default: "student",
//       required: true,
//       enum: ["student", "teacher", "admin"],
//     },
//   },
//   { timestamps: true }
// );

// schema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     this.password = bcrypt.hashSync(this.password, 10);
//   }
//   next();
// });

// module.exports = model("User", schema);
