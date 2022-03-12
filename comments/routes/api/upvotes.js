var express = require("express");
var router = express.Router();

const upvoteService = require("../../services/upvote");
const socketService = require("../../services/socket");

/* GET Endpoint Check */
router.get("/", function (req, res, next) {
  res.sendStatus(200);
});

/* POST Create new comment */

router.post("/", async function (req, res) {
  const body = req.body;
  try {
    upvoteService.createUpvote({ commentId: body.commentId });
    socketService.sendNotification(req.body.commentId);
    res.status(201).send({ message: "Upvote submitted" });
  } catch (e) {
    res.status(500).send({ message: "Upvote submission failed" });
  }
});

module.exports = router;
