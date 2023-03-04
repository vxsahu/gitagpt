import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-primary-200 ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between">
              <div className="flex">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-700 p-2 hover:bg-orange-200 rounded-xl"
                    href="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-700 p-2 hover:bg-orange-200 rounded-xl"
                    href="https://www.gitagpt.in/about"
                  >
                    About
                  </Link>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    href="https://www.sahu4you.com/donate"
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-700 p-2 hover:bg-orange-200 rounded-xl"
                  >
                    Donate
                  </a>
                </div>
              </div>

              <div className="flex">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <div className="flex text-blue-500 align-baseline">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      referrerPolicy="no-referrer"
                      href="https://www.sahu4you.com/gita-gpt"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium  hover:border-blue-300 hover:text-blue-700"
                    >
                      Read Gita
                    </a>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-800 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
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

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}

              <Disclosure.Button
                as="a"
                href="https://www.gitagpt.in/tools/kanha"
                className="block border-l-4 border-primary-500 hover:bg-primary-100 py-2 pl-3 pr-4 text-base font-medium text-gray-500"
              >
                Kahna
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="https://www.gitagpt.in/tools/radha-krishna"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Radhe Krishna
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="https://www.gitagpt.in/tools/yogeshwar"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Yogeshwar
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="https://www.gitagpt.in/tools/dwarkadhish"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Dwarkadhish
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
