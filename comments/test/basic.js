const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Basics", function () {
  it("Should boot the server", function () {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });
  it("Should return HTML from the index page", function () {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.be.html;
      });
  });
});
