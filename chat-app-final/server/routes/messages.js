const {
  addMessage,
  getAllMessages,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.get("/getallmessages/", getAllMessages);

module.exports = router;
