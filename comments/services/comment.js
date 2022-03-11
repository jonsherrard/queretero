const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en.json");

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

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
      include: {
        _count: {
          select: { upvotes: true },
        },
      },
    });
    const enrichedComments = comments.map((comment) => {
      return {
        ...comment,
        upvotes: comment._count.upvotes,
        timeAgo: timeAgo.format(comment.createdAt),
      };
    });
    return enrichedComments;
  } catch (e) {
    console.log({ serviceError: e });
    throw new Error(e);
  }
};

module.exports = {
  createComment: createComment,
  readComments: readComments,
};
