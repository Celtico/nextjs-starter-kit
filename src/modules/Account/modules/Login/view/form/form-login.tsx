"use client";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
//-------------------------------------------
import LoginModel from "../../model/LoginModel";
import LoadingDots from "../loading/LoadingDots";

/**
 * Form
 * @constructor
 */
export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        LoginModel({e,setLoading,router})
      }}
      className="mt-8 space-y-6"
    >
      <div>
        <Toaster />
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading
          ? <LoadingDots color="#808080" />
          : <p>LogIn</p>
        }
      </button>
      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/account/register" className="font-semibold text-gray-600">
          Register
        </Link>{" "}
        for free.
      </p>
    </form>
  );
}
