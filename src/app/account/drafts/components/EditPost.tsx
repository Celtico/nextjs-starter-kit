"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const publishPost = async ({id,router}) => {
  await fetch(`/api/publish/${id}`, { method: "PUT"}).then(e=>{
    console.log(e)
    toast.success('deletePost');
    setTimeout(()=>{
      router.push("/account/drafts/all")
    },2000)
  }).catch(e=>{
    console.log(e)
  });
}

const  deletePost = async ({id, router}) => {
 fetch(`/api/post/${id}`, { method: "DELETE"}).then(e=>{
   console.log(e)
   toast.success('deletePost');
   setTimeout(()=>{
     router.push("/account/drafts/all")
   },2000)
 }).catch(e=>{
   console.log(e)
 });
}

export const Create = async ({body,router}) => {
  fetch(`/api/post`, { method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }).then(e=>{
    console.log(e)
    toast.success('Crate Post');
    setTimeout(()=>{
      router.push("/account/drafts")
    },2000)
  }).catch(e=>{
    console.log(e)
  });
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
          onClick={() => publishPost({id:post.id,router})}
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
          onClick={() => deletePost({id:post.id,router})}
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
