const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

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
    subject: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "teacher",
      required: true,
    },
    position: {
      type: String,
      default: "teacher",
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

module.exports = model("Teacher", schema);
