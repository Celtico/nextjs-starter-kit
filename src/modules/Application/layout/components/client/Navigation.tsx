"use client";
import React from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import NavigationAccount from "../account/NavigationAccount";

const navigation = [
  { name: "Company", href: "/", current: false },
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
                    <Link
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
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
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
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    <NavigationAccount {...props} session={session} />
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
              <div className="pt-4 pb-3">
                <div className="flex  px-5">
                  <NavigationAccount {...props} session={session} />
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
