import { SlLocationPin } from 'react-icons/sl'
import { PlaceType } from '../../types/place.type'
import { useEffect, useState } from 'react'
import { BookingType } from '../../types/booking.type'
import { useBooking } from '../../context'

type props = {
    place?: PlaceType | BookingType
    select: () => void
    edit?: () => void
    myBookings?: boolean
}

export const Card = ({ place, select, myBookings, edit }: props) => {
    const [data, setData] = useState<PlaceType | BookingType | any>()
    const { selectPlace } = useBooking()

    useEffect(() => {
        const placeId = (place as BookingType).placeId
        if (placeId) {
            const item = selectPlace(placeId)
            setData(item)
        } else {
            setData(place as PlaceType)
        }
    }, [myBookings, place])

    return (
        <>
            <div className="listing-card group/item relative inline-flex w-full min-w-[250px] flex-1 flex-col rounded-xl shadow md:max-w-[33%]">
                <div className="relative w-full overflow-hidden rounded-xl">
                    <div className="listing-item relative after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-1/4 after:w-full after:bg-gradient-to-t after:from-black/25">
                        <img
                            className="h-full min-h-[250px] w-full object-cover"
                            src={data?.image}
                            alt=""
                        />
                        <span className="absolute bottom-[20px] right-[20px] z-20 text-xl font-semibold text-white">
                            ${data?.price}
                            {''}
                            <span className="text-sm">/night</span>
                        </span>
                    </div>
                </div>
                <div className="content px-4 py-4">
                    <div className="mb-1 flex items-center">
                        <span className="font-bold">{data?.title}</span>
                    </div>

                    <div className="flex items-center justify-between text-ellipsis 2xl:mb-1.5">
                        <div className="flex items-center text-gray-500">
                            <SlLocationPin />
                            <span className="pl-2">{data?.location}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="mt-8 max-h-[100px] overflow-hidden text-gray-light">
                            {data?.description}
                        </p>

                        {myBookings && (
                            <div className="flex flex-col space-y-4">
                                <span className="flex"></span>
                                <div>
                                    <span className={'font-semibold'}>
                                        Check-in Date:{' '}
                                    </span>
                                    {new Date(
                                        (place as BookingType)?.checkInDate
                                    ).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className={'font-semibold'}>
                                        Check-out Date:{' '}
                                    </span>
                                    {new Date(
                                        (place as BookingType)?.checkOutDate
                                    ).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className={'font-semibold'}>
                                        Total:{' '}
                                    </span>
                                    ${(place as BookingType)?.total}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() =>
                                edit && myBookings ? edit() : select()
                            }
                            className="w-full rounded border border-gray-300 px-6 py-2 text-gray-700 hover:bg-blue-100 hover:transition-colors hover:duration-150"
                        >
                            {myBookings ? 'Edit Booking' : 'Book Now'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
