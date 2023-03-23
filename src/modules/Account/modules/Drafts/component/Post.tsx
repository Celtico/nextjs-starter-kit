import React from "react";
import ReactMarkdown from "react-markdown";

const Post = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div>
      <a href={`/account/drafts/${post.id}`} className="px-4 py-5 sm:px-6 cursor-pointer">
        <h1 className="text-3xl font-bold tracking-tight  text-gray-500">{post.title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">By {authorName}</p>
        {/* eslint-disable-next-line react/no-children-prop,react/jsx-no-undef */}
        <ReactMarkdown children={post.content} />
      </a>
    </div>
  );
};

export default Post;
