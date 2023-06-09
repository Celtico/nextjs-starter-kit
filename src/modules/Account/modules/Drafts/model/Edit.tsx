"use client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

/**
 * publishPost
 * @param id
 * @param router
 */
const publishPost = async ({ id, router }) => {
  await fetch(`/api/publish/${id}`, { method: "PUT" }).then(e => {
    if (e.status === 200) {
      toast.success("publishPost");
      setTimeout(() => {
        router.push("/account/drafts");
      }, 2000);
    } else {
      toast.error("publishPost");
    }
  }).catch(e => {
    console.log("catchError", e);
  });
};
/**
 * deletePost
 * @param id
 * @param router
 */
const deletePost = async ({ id, router }) => {
  fetch(`/api/post/${id}`, { method: "DELETE" }).then(e => {
    if (e.status === 200) {
      toast.success("deletePost");
      setTimeout(() => {
        router.push("/account/drafts");
      }, 2000);
    } else {
      toast.error("deletePost");
    }
  }).catch(e => {
    console.log("catchError", e);
  });
};
/**
 * CreatePost
 * @param body
 * @param router
 * @constructor
 */
export const CreatePost = async ({ body, router }) => {
  fetch(`/api/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(e => {
    if (e.status === 200) {
      toast.success("CratePost");
      setTimeout(() => {
        window.location.href = "/account/drafts"
      }, 2000);
    } else {
      toast.error("CratePost");
    }
  }).catch(e => {
    console.log("catchError", e);
  });
};
/**
 * Edit
 * @param post
 * @param session
 * @constructor
 */
const Edit = ({ post, session }) => {
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
          onClick={() => publishPost({ id: post.id, router })}
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
          onClick={() => deletePost({ id: post.id, router })}
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
  )
};

export default Edit

