const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en.json");

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const createComment = async function ({ text, parentId = null }) {
  try {
    await prisma.comment.create({
      data: {
        text: text,
        parentCommentId: parentId ? parseInt(parentId) : null,
      },
    });
  } catch (e) {
    console.log({ serviceError: e });
    throw new Error(e);
  }
};

const getComment = async function ({ commentId }) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(commentId),
      },
      include: {
        _count: {
          select: { upvotes: true },
        },
      },
    });
    // Flatten the response from Prisma ORM to be more "API-like"
    const returnable = {
      ...comment,
      upvotes: comment._count.upvotes,
    };
    // This is probably terrible
    delete returnable._count;
    return returnable;
  } catch (e) {
    console.log({ serviceError: e });
    throw new Error(e);
  }
};

const enrichComment = (comment) => {
  return {
    ...comment,
    upvotes: comment._count.upvotes,
    timeAgo: timeAgo.format(comment.createdAt),
    children: comment.children ? comment.children.map(enrichComment) : null,
  };
};

const getCommentList = async function ({ offset = 0, limit = 10 }) {
  try {
    const comments = await prisma.comment.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        parentCommentId: null,
      },
      include: {
        children: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            _count: {
              select: {
                upvotes: true,
              },
            },
          },
        },
        _count: {
          select: { upvotes: true },
        },
      },
    });
    const enrichedComments = comments.map(enrichComment);
    return enrichedComments;
  } catch (e) {
    console.log({ serviceError: e });
    throw new Error(e);
  }
};

module.exports = {
  createComment: createComment,
  getCommentList: getCommentList,
  getComment: getComment,
};
