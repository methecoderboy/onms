const bcrypt = require("bcryptjs");

const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    rollnumber: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      enum: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"],
    },
    semester: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      enum: ["A", "B", "C", "D"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
      required: true,
    },
    notices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notice",
      },
    ],
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

module.exports = model("Student", schema);
