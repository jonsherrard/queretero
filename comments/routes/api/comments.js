var express = require("express");
var router = express.Router();

const commentService = require("../../services/comment");

/* GET Endpoint Check */
router.get("/", function (req, res, next) {
  res.sendStatus(200);
});

/* POST Create new comment */

router.post("/", async function (req, res) {
  const body = req.body;
  try {
    commentService.createComment({ text: body.text });
    res.status(201).json({ message: "Comment submitted" });
  } catch (e) {
    res.status(500).json({ message: "Comment submission failed" });
  }
});

module.exports = router;
