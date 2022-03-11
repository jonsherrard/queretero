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
  if (comment.length != 0) {
    request.send(data);
  }
});

const { createElement, useState } = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);

function ClickCounter({ initialUpvoteCount, commentId }) {
  const [count, setCount] = useState(initialUpvoteCount);

  return html`
    <a
      onClick=${() => {
        setCount(count + 1);
        var request = new XMLHttpRequest();
        var url = "/api/upvotes/";
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
          if (request.readyState === 4 && request.status === 201) {
            var jsonData = JSON.parse(request.response);
          }
          if (request.readyState === 4 && request.status === 500) {
            var jsonData = JSON.parse(request.response);
            setCount(count - 1);
          }
        };
        var data = JSON.stringify({
          commentId: commentId,
        });
        request.send(data);
      }}
      className="mr-6 cursor-pointer hover:text-purple-500"
    >
      <div
        className="relative inline-block w-3 mr-1 overflow-hidden hover:text-purple-600 bottom-px"
      >
        <div
          className="w-2 h-2 origin-bottom-left transform rotate-45 bg-gray-600 hover:bg-purple-500"
        ></div>
      </div>
      Upvote (${count})
    </a>
  `;
}

const comments = document.querySelectorAll(".app-upvote");
comments.forEach(function (el) {
  const initialUpvoteCount = parseInt(el.dataset.initialUpvoteCount);
  const upvoteCommentId = parseInt(el.dataset.upvoteCommentId);
  render(
    html`<${ClickCounter}
      initialUpvoteCount="${initialUpvoteCount}"
      commentId="${upvoteCommentId}"
    />`,
    el
  );
});

const replyButtons = document.querySelectorAll(".reply-button");
replyButtons.forEach(function (el) {
  el.addEventListener("click", function () {
    const commentInput = document.getElementById("comment-input");
    commentInput.focus();
  });
});
