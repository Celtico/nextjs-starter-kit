import React from "react";
import { getServerSession } from "next-auth/next";
import ReactMarkdown from "react-markdown";
import prisma from "../../../../../lib/prisma";
import EditPost from "../components/EditPost";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const RowEdit = async (props) => {
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
const Page = async (props) => {
  const session = await getServerSession(authOptions);
  const post = await RowEdit(props);
  let title = "", name = "Unknown author", content = "";
  if (
    post &&
    post.title &&
    post.author &&
    post.author.name
  ) {
    title = String(post.title);
    name = String(post.author.name);
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
            <EditPost post={post} session={session} />
          </div>
        </main>
      </div>
    );
  } else {
    return <div>Authenticating ...</div>;
  }
};

export default Page;
