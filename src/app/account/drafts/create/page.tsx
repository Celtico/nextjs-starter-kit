"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Create } from "../components/EditPost";

export default  function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await Create({ body, router })
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <header className="shadow-md backdrop-brightness-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Account
          </h1>
          <small>Create Post</small>
        </div>
      </header>
      <main className={"backdrop-brightness-150"}>
        <Toaster />
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <form onSubmit={submitData}>
            <label htmlFor="company-website" className="block text-sm font-medium leading-6">
              Title
            </label>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
              className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
            />
            <label htmlFor="about" className="block text-sm font-medium leading-6">
              Content
            </label>
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
              className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
            />
            <div className={"h-3"} />
            <button
              type="submit"
              className="mt-1 block w-full rounded-md shadow-sm ring-1 ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
            >
              Save
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
