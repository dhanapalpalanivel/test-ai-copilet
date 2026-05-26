const mongoose = require("mongoose");

const registrationEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("RegistrationEvent", registrationEventSchema);
