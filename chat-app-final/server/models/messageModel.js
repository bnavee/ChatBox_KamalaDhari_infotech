const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    user: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  itMessages: mongoose.model("ItMessages", MessageSchema),
  salesMessages: mongoose.model("SalesMessages", MessageSchema),
  hrMessages: mongoose.model("HRMessages", MessageSchema),
};
