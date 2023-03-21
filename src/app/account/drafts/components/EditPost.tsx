"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const publishPost = async (id,router) => {
  await fetch(`/api/publish/${id}`, { method: "PUT"});
  toast.success('publishPost');
  setTimeout(()=>{
    router.push("/account/drafts/all")
  },500)

}

const  deletePost = async (id, router) => {
  await fetch(`/api/post/${id}`, { method: "DELETE"});
  toast.success('deletePost');
  setTimeout(()=>{
    router.push("/account/drafts/all")
  },500)
}


const EditPost = ({ post, session }) => {
  const router = useRouter();
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post.author?.email;
  return (
    <div className="mt-5 flex  gap-x-6">
      <Toaster />
      {!post.published && userHasValidSession && postBelongsToUser && (
        <button
          className="
                  rounded-md bg-indigo-600 px-3.5 py-2.5
                  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-indigo-600
                  "
          onClick={() => publishPost(post.id,router)}
        >Publish</button>
      )}
      {userHasValidSession && postBelongsToUser && (
        <button
          className="
                  rounded-md bg-indigo-600 px-3.5 py-2.5
                  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-indigo-600
                  "
          onClick={() => deletePost(post.id,router)}
        >Delete</button>
      )}
      <a
        href="/account/drafts/all"
        className="
                  rounded-md bg-indigo-600 px-3.5 py-2.5
                  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-indigo-600
                  "
      >
        Back
      </a>
    </div>
  );
};


export default EditPost;