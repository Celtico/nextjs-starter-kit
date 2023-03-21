import { getServerSession } from "next-auth/next";
import Post from "../components/Post";
import prisma from "../../../../../lib/prisma";

export async function DraftSProps() {
  const session = await getServerSession();
  if (!session) {
    return { props: { drafts: [] } };
  } else if (session && session.user && session.user.email) {
    const drafts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return {
      props: {
        drafts,
        revalidate: 10,
      },
    };
  } else {
    return { props: { drafts: [] } };
  }
}


const Drafts = async () => {
  const all = await DraftSProps();
  const session = await getServerSession();
  if (!session) {
    return (
      <>
        <header className="shadow-md backdrop-brightness-200">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Account
            </h1>
            <small>Drafts authenticated</small>
          </div>
        </header>
        <main className={"backdrop-brightness-150"}>
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div>You need to be authenticated to view this page.</div>
          </div>
        </main>
      </>
    );
  }
  return (
    <>
      <header className="shadow-md backdrop-brightness-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Account
          </h1>
          <small>All Post</small>
        </div>
      </header>
      <main className={"backdrop-brightness-150"}>
        <div className="mx-auto max-w-2xl py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <ul>
            {session ? all.props.drafts.map((post: any) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            )) : "·······"}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Drafts;
