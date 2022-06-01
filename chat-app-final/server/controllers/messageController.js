const {
  itMessages,
  salesMessages,
  hrMessages,
} = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, department, message } = req.body;
    let data;
    if (department === "it") {
      data = await itMessages.create({
        message: { text: message },
        user: from,
      });
    } else if (department === "sales") {
      data = await salesMessages.create({
        message: { text: message },
        user: from,
      });
    } else if (department === "hr") {
      data = await hrMessages.create({
        message: { text: message },
        user: from,
      });
    }

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    // const url_parts = url.parse(request.url, true);
    const { department } = req.query;

    console.log(req.query);
    console.log(department);
    const schema =
      department === "it"
        ? itMessages
        : department === "sales"
        ? salesMessages
        : hrMessages;
    let allMessages = await schema.find().select(["user", "message", "_id"]);
    allMessages = allMessages.map((msg) => ({
      user: msg.user,
      message: msg.message.text,
    }));
    return res.json(allMessages);
  } catch (ex) {
    next(ex);
  }
};
