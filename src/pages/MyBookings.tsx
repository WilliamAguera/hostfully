import Listings from '../components/listings'
import React from 'react'
import { useBooking } from '../context'
import { BookingType } from '../types/booking.type'
import { useNavigate } from 'react-router-dom'

const MyBookings = () => {
    const { state } = useBooking()
    const navigate = useNavigate()

    const onEdit = (item: BookingType) => {
        navigate(`/booking/${item.placeId}/${item.id}/edit`)
    }

    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className={'container-fluid mt-5 px-4'}>
                <Listings
                    data={state.myBookings}
                    myBookings={true}
                    edit={(item: BookingType) => onEdit(item)}
                />
            </div>
        </div>
    )
}

export default MyBookings
