const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createComment = async function ({ text }) {
  try {
    await prisma.comment.create({
      data: {
        text: text,
      },
    });
  } catch (e) {
    console.log({ serviceError: e });
    throw new Error(e);
  }
};

module.exports = {
  createComment: createComment,
};
