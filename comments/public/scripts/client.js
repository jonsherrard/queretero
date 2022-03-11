const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var request = new XMLHttpRequest();
  var url = "/api/comments/";
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 201) {
      var jsonData = JSON.parse(request.response);
      location.reload();
    }
    if (request.readyState === 4 && request.status === 500) {
      var jsonData = JSON.parse(request.response);
      alert(jsonData.message);
    }
  };
  var comment = document.getElementById("comment-input").value;
  var data = JSON.stringify({
    text: comment,
  });
  request.send(data);
});

const comments = document.querySelectorAll("[data-upvote-comment-id]");
comments.forEach(function (el) {
  el.addEventListener("click", function (event) {
    var request = new XMLHttpRequest();
    var url = "/api/upvotes/";
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 201) {
        var jsonData = JSON.parse(request.response);
        location.reload();
      }
      if (request.readyState === 4 && request.status === 500) {
        var jsonData = JSON.parse(request.response);
        alert(jsonData.message);
      }
    };
    var commentId = this.dataset.upvoteCommentId;
    var data = JSON.stringify({
      commentId: commentId,
    });
    request.send(data);
  });
});

const replyButtons = document.querySelectorAll(".reply-button");
replyButtons.forEach(function (el) {
  el.addEventListener("click", function () {
    const commentInput = document.getElementById("comment-input");
    commentInput.focus();
  });
});
