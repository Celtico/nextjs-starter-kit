"use client";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

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
    <div onClick={() => router.push(`/index/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={post.content} />
    </div>
  );
};

export default Post;
