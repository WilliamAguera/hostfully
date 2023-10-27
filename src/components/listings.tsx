import Card from './ui/card'
import { PlaceType } from '../types/place.type'
import { BookingType } from '../types/booking.type'
import { ImFilesEmpty } from 'react-icons/im'

type Props = {
    data: PlaceType[] | BookingType[]
    select?: (place: PlaceType) => void
    edit?: (booking: BookingType) => void
    myBookings?: boolean
}

const Listings = ({ data, select, edit, myBookings }: Props) => {
    return (
        <div className="flex flex-wrap gap-4">
            {!data.length && (
                <div className="mx-auto mt-12 flex flex-col items-center space-y-4 text-gray-light">
                    <ImFilesEmpty className="text-2xl" />
                    <span className="text-md">No items found</span>
                </div>
            )}
            {data.map((item: any, idx: number) => (
                <Card
                    myBookings={myBookings}
                    key={idx}
                    place={item}
                    edit={() => (edit ? edit(item) : null)}
                    select={() => (select ? select(item) : null)}
                />
            ))}
        </div>
    )
}

export default Listings
