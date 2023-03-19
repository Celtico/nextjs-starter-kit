"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>New Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input disabled={!content || !title} type="submit" value="Create" />
        <a
          className="back"
          href="src/app/login/create#"
          onClick={() => router.push("/reports")}
        >
          or Cancel
        </a>
      </form>
    </div>
  );
};

export default Draft;