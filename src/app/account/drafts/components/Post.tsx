"use client";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import React from "react";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const router = useRouter();
  return (
    <a onClick={() => router.push(`/account/drafts/${post.id}`)} className="px-4 py-5 sm:px-6 cursor-pointer">
      <h1 className="text-3xl font-bold tracking-tight  text-gray-500">{post.title}</h1>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">By {authorName}</p>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={post.content} />
    </a>
  );
};

export default Post;
