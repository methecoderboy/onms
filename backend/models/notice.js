const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "general",
        "academic",
        "admission",
        "placement",
        "meeting",
        "event",
        "holiday",
        "urgent",
      ],
    },
  },
  { timestamps: true }
);

module.exports = model("Notice", schema);
