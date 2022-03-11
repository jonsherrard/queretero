const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUpvote = async function ({ commentId }) {
  try {
    await prisma.upvote.create({
      data: {
        commentId: commentId,
      },
    });
  } catch (e) {
    console.log({ serviceError: e });
    throw new Error(e);
  }
};

module.exports = {
  createUpvote: createUpvote,
};
