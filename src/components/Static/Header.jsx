import Link from "next/link"
import { BsFillPlayFill } from "react-icons/bs"
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'

export default function Header() {
    return <>
        <div className="flex items-center w-full grid grid-cols-12 gap-6">
            <div className="col-span-8 lg:col-span-4">
                <Link href="/" passHref>
                    <div className="cursor-pointer flex items-center gap-1 font-semibold text-xl">
                        <BsFillPlayFill className="w-12 h-12" />
                        <p>Movie App</p>
                    </div>
                </Link>
            </div>
            <div className="hidden col-span-4 lg:col-span-8 w-full h-4 gap-6 lg:flex items-center justify-end">
                <a href="https://github.com/clqu/movie-app" target="_blank" className="font-medium transition-all duration-200 hover:bg-zinc-500/10 px-6 py-2 rounded-lg">
                   Source Code
                </a>
                <Link href="/search">
                    <a className="font-medium transition-all duration-200 hover:bg-zinc-500/10 px-6 py-2 rounded-lg">
                        Search
                    </a>
                </Link>
                <Link href="#">
                    <a className="font-medium transition-all duration-200 bg-blue-600/20 text-blue-600 hover:bg-blue-600/30 px-6 rounded-lg py-2">
                        Login
                    </a>
                </Link>
            </div>
            <Menu as="div" className="col-span-4 relative inline-block text-left">
                <div>
                    <Menu.Button className="lg:hidden inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Menu
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <a href="https://github.com/clqu/movie-app" target="_blank">
                                <Menu.Item>
                                    {({ active }) => (

                                        <button
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Source Code
                                        </button>
                                    )}
                                </Menu.Item>
                            </a>
                            <Link href="/about">
                                <Menu.Item>
                                    {({ active }) => (

                                        <button
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            About Us
                                        </button>
                                    )}
                                </Menu.Item>
                            </Link>
                            <Link href="/search">
                                <Menu.Item>
                                    {({ active }) => (

                                        <button
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Search
                                        </button>
                                    )}
                                </Menu.Item>
                            </Link>
                            <Link href="#">
                                <Menu.Item>
                                    {({ active }) => (

                                        <button
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Login
                                        </button>
                                    )}
                                </Menu.Item>
                            </Link>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    </>
}
