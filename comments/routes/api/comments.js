var express = require("express");
var router = express.Router();

const commentService = require("../../services/comment");

/* POST Create new comment */
router.post("/", async function (req, res) {
  const body = req.body;
  try {
    commentService.createComment({
      text: body.text,
      parentId: req.body.parentId || null,
    });
    res.status(201).json({ message: "Comment submitted" });
  } catch (e) {
    res.status(500).json({ message: "Comment submission failed" });
  }
});

router.get("/:commentId", async function (req, res) {
  const commentId = req.params.commentId;
  try {
    const comment = await commentService.getComment({ commentId });
    if (!comment) {
      throw new Error("Comment data not found");
    }
    res.status(200).json(comment);
  } catch (e) {
    res.status(500).json({ message: "Comment data not found" });
  }
});

module.exports = router;
