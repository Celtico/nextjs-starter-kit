import React from "react";
import ReactMarkdown from "react-markdown";
import Edit from "../../model/Edit";
import prisma from "../../../../../../../lib/prisma";

/**
 * EditPost
 * @param props
 * @constructor
 */
export const EditPost = async (props) => {
  return prisma.post.findUnique({
    where: {
      id: String(props.params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
};
const Index = async (props) => {
  // @ts-ignore
  const post = await EditPost(props);
  const { session } = props;
  if (!session) {
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
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div>You need to be authenticated to view this page.</div>
          </div>
        </main>
      </>
    );
  }
  let title = "", name = "Unknown author", content = "";
  if (
    post &&
    post.title
  ) {
    title = String(post.title);
    if (
      post.author &&
      post.author.name
    ) {
      name = String(post.author.name);
    }
    content = String(post.content);
    if (post.published) {
      title = `${title} (Draft)`;
    }
    return (
      <div>
        <header className="shadow-md backdrop-brightness-200">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Account
            </h1>
            <small>Drafts By id</small>
          </div>
        </header>
        <main className={"backdrop-brightness-150"}>
          <div className="mx-auto max-w-2xl py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold text-gray-500 tracking-tight">
              {title}
            </h1>
            <small className={"text-gray-500"}>By {name}</small>
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={content} />
            <Edit post={post} session={session} />
          </div>
        </main>
      </div>
    );
  } else {
    return <div>Authenticating ...</div>;
  }
};

export default Index;
