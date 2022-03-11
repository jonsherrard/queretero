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

const readComments = async function ({ offset = 0, limit = 10 }) {
  try {
    const comments = await prisma.comment.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    return comments;
  } catch (e) {
    console.log({ serviceError: e });
    throw new Error(e);
  }
};

module.exports = {
  createComment: createComment,
  readComments: readComments,
};
