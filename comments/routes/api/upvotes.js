var express = require("express");
var router = express.Router();

const upvoteService = require("../../services/upvote");

/* GET Endpoint Check */
router.get("/", function (req, res, next) {
  res.sendStatus(200);
});

/* POST Create new comment */

router.post("/", async function (req, rest) {
  const body = req.body;
  try {
    upvoteService.createUpvote({ commentId: body.commentId });
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
