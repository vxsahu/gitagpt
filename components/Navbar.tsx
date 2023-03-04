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
                href="https://www.gitagpt.in/"
                className="block border-l-4 border-primary-500 hover:bg-primary-100 py-2 pl-3 pr-4 text-base font-medium text-gray-500"
              >
				  <svg id="Layer_1" style="enable-background:new 0 0 64 64;" version="1.1" viewBox="0 0 64 64" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
	.st0{fill:#134563;}
</style><g><g id="Icon-Heart" transform="translate(178.000000, 230.000000)"><path className="st0" d="M-146-177.1l-0.8-0.7c-18.2-14.8-23.1-20-23.1-28.5c0-7,5.7-12.6,12.6-12.6     c5.8,0,9.1,3.3,11.3,5.8c2.2-2.5,5.5-5.8,11.3-5.8c7,0,12.6,5.7,12.6,12.6c0,8.5-4.9,13.7-23.1,28.5L-146-177.1L-146-177.1z      M-157.3-216.3c-5.5,0-10,4.5-10,10c0,7.3,4.6,12.1,21.3,25.8c16.7-13.7,21.3-18.5,21.3-25.8c0-5.5-4.5-10-10-10     c-5,0-7.7,3-9.8,5.4l-1.5,1.7l-1.5-1.7C-149.6-213.3-152.3-216.3-157.3-216.3L-157.3-216.3z" id="Fill-18"/></g></g></svg>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="https://www.gitagpt.in/about/"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                About
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="https://www.gitagpt.in/contact/"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Contact
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="https://www.gitagpt.in/blog/"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Blog
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
