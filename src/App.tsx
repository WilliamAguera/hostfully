import React from 'react'
import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
    return (
        <div className="flex min-h-full flex-col">
            <header className="bg-white shadow">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-12 sm:px-6 lg:px-8">
                    <img
                        src="/hostfully.webp"
                        alt="logo"
                        className="w-12 md:hidden"
                    />
                    <h1 className="hidden text-3xl font-bold tracking-tight text-gray-900 md:flex">
                        Hostfully Booking
                    </h1>
                    <ul className="hover: my-0 inline-flex cursor-pointer space-x-8 tracking-widest">
                        <li className="hover:text-blue-300 hover:transition-colors hover:duration-300">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:text-blue-300 hover:transition-colors hover:duration-300">
                            <Link to="my-bookings" className={'list-none'}>
                                My Bookings
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
            <main className="mb-40 flex flex-1 justify-center md:mb-0">
                <Outlet />
            </main>
        </div>
    )
}

export default App
