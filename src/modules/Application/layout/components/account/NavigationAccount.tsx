"use client";
import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { ThemeToggle } from "../client/ThemeToggle";
import styles from "./navigation-account.module.css";

/**
 * NavigationAccount
 * @param props
 * @constructor
 */
export default function NavigationAccount(props) {
  const { session } = props;
  return (
    <div className={styles.NavigationAccount}>
      <div className="mx-auto mt-3">
        <Popover className="relative h-10">
          <div className={styles.ThemeToggle}>
            <ThemeToggle />
          </div>
          <Popover.Button className="inline-flex  gap-x-1 text-sm font-semibold leading-6 text-gray-500">
            {session && session.user && session.user.image
              ? <div
                className="  h-7 w-7  mr-2 rounded-full bg-gray-500">
                <img className="mt-1 ml-1  h-5 w-5 rounded-full" src={session.user.image} />
              </div>
              : <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>}
            <span className={"mt-1/5"}>  {session && session.user && session.user.name
              ? session.user.name
              : session && session.user && session.user.email
                ? session.user.email
                : null}</span>
            <ChevronDownIcon className="h-5 w-5 mt-1" aria-hidden="true" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >

            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-4">
                {
                  session ?
                    <>
                      <Link
                        href="/account"
                        className={"block px-4 py-2 text-sm text-gray-700"}
                      >
                        {session && session.user && session.user.name
                          ? session.user.name
                          : session && session.user && session.user.email
                            ? session.user.email
                            : null}
                      </Link>
                      <Link
                        href="/account/drafts/all"
                        className={"block px-4 py-2 text-sm text-gray-700"}
                      >
                        All Posts
                      </Link>
                      <Link
                        href="/account/drafts"
                        className={"block px-4 py-2 text-sm text-gray-700"}
                      >
                        Drafts
                      </Link>
                      <Link
                        href="/account/drafts/create"
                        className={"block px-4 py-2 text-sm text-gray-700"}
                      >
                        Create
                      </Link>
                      <Link
                        href="src/modules/Aplication/layout/components/account#"
                        className={"block px-4 py-2 text-sm text-gray-700"}
                        onClick={() => signOut()}
                      >
                        Logout
                      </Link>
                    </>
                    :
                    <>
                      <Link
                        href="/account/login"
                        className={"block px-4 py-2 text-sm text-gray-700"}
                      >
                        Login
                      </Link>
                      <Link
                        href="/api/auth/signin"
                        className={"block px-4 py-2 text-sm text-gray-700"}
                      >
                        Login Providers
                      </Link>
                      <Link
                        href="/account/register"
                        className={"block px-4 py-2 text-sm text-gray-700"}
                      >
                        Register
                      </Link>
                    </>
                }
              </div>
            </div>
          </Transition>
        </Popover>
      </div>
    </div>
  );
}
