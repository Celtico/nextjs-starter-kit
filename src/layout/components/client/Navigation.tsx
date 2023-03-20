"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/layout/components/client/ThemeToggle";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Company", href: "/company", current: false },
  { name: "Products", href: "/products", current: false },
];

//https://www.w3.org/TR/WD-math-970710/table06.html
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation(props) {
  const router = useRouter();
  const pathname = usePathname();
  const session = props.AuthStatusDataArray;
  return (
    <div className={"shadow-lg  relative z-10"}>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a
                      onClick={(event) => {
                        event.preventDefault();
                        router.push("/");
                      }}
                      href={"/"}
                    >
                      <Image
                        className="h-8 w-8"
                        src="/mark.svg"
                        alt="Your Company"
                        width={100}
                        height={100}
                      />
                    </a>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          onClick={(event) => {
                            event.preventDefault();
                            router.push(item.href);
                          }}
                          href={item.href}
                          key={item.name}
                          className={classNames(
                            pathname !== item.href
                              ? "text-opacity-50 hover:text-opacity-70 hover:text-opacity-80"
                              : "backdrop-brightness-50 text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <ThemeToggle />
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button
                          className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {
                            session ?
                              <>
                                <Menu.Item>
                                  <a
                                    href="/account"
                                    className={"block px-4 py-2 text-sm text-gray-700"}
                                  >
                                    {session && session.user && session.user.name
                                      ? session.user.name
                                      : session && session.user && session.user.email
                                        ? session.user.email
                                        : null}
                                  </a>
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => session && (
                                    <a
                                      href="#"
                                      className={"block px-4 py-2 text-sm text-gray-700"}
                                      onClick={() => signOut()}
                                    >
                                      Logout
                                    </a>
                                  )}
                                </Menu.Item>
                              </>
                              :
                              <>
                                <Menu.Item>
                                  <a
                                    href="/account/login"
                                    className={"block px-4 py-2 text-sm text-gray-700"}
                                  >
                                    Login
                                  </a>
                                </Menu.Item>
                                <Menu.Item>
                                  <a
                                    href="/account/register"
                                    className={"block px-4 py-2 text-sm text-gray-700"}
                                  >
                                    Register
                                  </a>
                                </Menu.Item>
                              </>
                          }
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="inline-flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    { session ?
                        <>
                          <a
                            href="/account"
                            className={"block px-4 py-2 text-sm text-gray-500"}
                          >
                            {session && session.user && session.user.name
                              ? session.user.name
                              : session && session.user && session.user.email
                                ? session.user.email
                                : null}
                          </a>
                          <a
                            href="#"
                            className={"block px-4 py-2 text-sm text-gray-500"}
                            onClick={() => signOut()}
                          >
                            Logout
                          </a>
                        </>
                        :
                        <>
                          <a
                            href="/account/login"
                            className={"block px-4 py-2 text-sm text-gray-500"}
                          >
                            Login
                          </a>
                          <a
                            href="/account/register"
                            className={"block px-4 py-2 text-sm text-gray-500"}
                          >
                            Register
                          </a>
                        </>
                    }
                  </div>
                  <div
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
