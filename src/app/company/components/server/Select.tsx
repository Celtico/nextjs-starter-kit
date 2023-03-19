import prisma from "../../../../../lib/prisma";

export const All = async () => {
  const all = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { all },
  };
};

export const Row = async (props) => {
  const row = await prisma.post.findUnique({
    where: {
      id: String(props.params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: { row },
  };
};
