var express = require("express");
var router = express.Router();
const commentService = require("../services/comment");
const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en.json");

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const comments = await commentService.readComments({ limit: 10 });
  const timeAgoComments = comments.map((comment) => {
    return {
      ...comment,
      timeAgo: timeAgo.format(comment.createdAt),
    };
  });
  console.log({ timeAgoComments });
  res.render("index", { title: "Express", comments: timeAgoComments });
});

module.exports = router;
