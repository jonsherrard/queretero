var express = require("express");
var router = express.Router();
const commentService = require("../services/comment");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const comments = await commentService.getCommentList({ limit: 10 });
  res.render("index", { title: "Queretero", comments });
});

module.exports = router;
