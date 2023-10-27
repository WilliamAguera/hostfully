import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Book from './pages/Book'
import MyBookings from './pages/MyBookings'
import { BookingProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'my-bookings',
                element: <MyBookings />,
            },
            {
                path: 'booking/:id',
                element: <Book />,
            },
            {
                path: 'booking/:id/:requestId/edit',
                element: <Book />,
            },
        ],
    },
])

root.render(
    <React.StrictMode>
        <BookingProvider>
            <RouterProvider router={router} />
        </BookingProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
