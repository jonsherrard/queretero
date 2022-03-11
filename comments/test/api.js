const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;
chai.use(chaiHttp);

describe("API", function () {
  it("Creates a new comment and returns 201", function () {
    chai
      .request(server)
      .post("/api/comments/")
      .send({
        text: "This comment was sent by the test suite",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.contain("Comment submitted");
      });
  });
  it("Creates a new upvote and returns 201", function () {
    chai
      .request(server)
      .post("/api/upvotes/")
      .send({ commentId: 9 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.contain("Upvote submitted");
      });
  });
});
