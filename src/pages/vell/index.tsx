import prisma from "../../../lib/prisma";

// @ts-ignore
export default function Blog({ posts }) {
  console.log(posts);
  return (
    <ul>

    </ul>
  );
}
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/blog/first-post',
      // Object variant:
      { params: { slug: 'second-post' } },
    ],
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // Call an external API endpoint to get posts
  const res = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });


  // Get the res we want to pre-render based on posts
  const paths = res.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: [
      // String variant:
      '/blog/first-post',
      // Object variant:
      { params: { slug: 'second-post' } },
    ],
    fallback: true,
  }
}
