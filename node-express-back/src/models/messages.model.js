const mongoose = require("mongoose");

const { toJSON, paginate } = require("./plugins");

const messagesSchema = mongoose.Schema(
  {
    messages: [
      {
        id: String,
        userId: String,
        title: String,
        text: String,
        createdDate: String,
        userName: String,
      },
      {
        timestamps: true,
      },
    ],
    userId: String,
    userName: String,
    title: String,
    text: String,
    id: String,
    createdDate: String,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messagesSchema.plugin(toJSON);
messagesSchema.plugin(paginate);

const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;
