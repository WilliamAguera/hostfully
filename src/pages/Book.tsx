import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useBooking } from '../context'
import { useEffect, useState } from 'react'
import { PlaceType } from '../types/place.type'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import { z } from 'zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatePicker from 'rsuite/DatePicker'
import 'rsuite/dist/rsuite.min.css'
import { SlLocationPin } from 'react-icons/sl'
import { BookingType } from '../types/booking.type'
import { BsTrash3Fill } from 'react-icons/bs'
import { LuAlertCircle } from 'react-icons/lu'

const BookingSchema = z
    .object({
        destination: z.string(),
        checkInDate: z
            .date()
            .min(new Date(), { message: 'Invalid check-in Date' }),
        checkOutDate: z
            .date()
            .min(new Date(), { message: 'Invalid check-out Date' }),
    })
    .superRefine(({ checkInDate, checkOutDate }, ctx) => {
        if (
            new Date(checkInDate).getTime() > new Date(checkOutDate).getTime()
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Check-out Date must be greater then Check-in Date.`,
                path: ['checkInDate'],
                fatal: true,
            })
            return z.NEVER
        }
    })

type BookingSchemaType = z.infer<typeof BookingSchema>

const Book = () => {
    const {
        control,
        getValues,
        setValue,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<BookingSchemaType>({
        defaultValues: {
            destination: '',
            checkInDate: new Date(),
            checkOutDate: new Date(
                new Date().setDate(new Date().getDate() + 7)
            ),
        },
        resolver: zodResolver(BookingSchema),
    })

    const {
        selectBooking,
        selectPlace,
        addBooking,
        updateBooking,
        removeBooking,
    } = useBooking()

    const { id, requestId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const [place, setPlace] = useState<PlaceType | null>(null)
    const [total, setTotal] = useState(0)

    const isEditing = location.pathname.includes('edit')

    useEffect(() => {
        const item = selectPlace(id as string)
        setValue('destination', item?.location as string)
        setPlace(item as PlaceType)
    }, [id])

    const checkInDateValue = useWatch({ control, name: 'checkInDate' })
    const checkOutDateValue = useWatch({ control, name: 'checkOutDate' })

    useEffect(() => {
        if (
            new Date(checkInDateValue).getTime() >
            new Date(checkOutDateValue).getTime()
        ) {
            setTotal(0)
            return
        }

        const diffTime = Math.abs(
            checkOutDateValue.getTime() - checkInDateValue.getTime()
        )
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        const result = diffDays * parseFloat(place?.price as string)

        setTotal(result)
    }, [place, checkInDateValue, checkOutDateValue])

    const handleConfirm = (data: BookingSchemaType) => {
        const booking: BookingType = {
            id: String(Math.floor(Math.random() * 53331) + 1),
            placeId: place?.id as string,
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,
            total: total.toString(),
        }

        if (isEditing) {
            updateBooking(requestId, {
                ...booking,
                id: requestId,
            })
            alert('Your booking has been updated!')
            navigate('/my-bookings')
            return
        }

        const add = addBooking(booking)
        if (!add) {
            alert(`You can't book this place twice`)
            return
        }
        alert('Your booking has been confirmed!')
        navigate('/my-bookings')
    }

    const handleDelete = () => {
        if (requestId) {
            const text = `Are you sure you want to delete the #${requestId} request ?`
            // eslint-disable-next-line no-restricted-globals
            const res = confirm(text)
            if (res) {
                removeBooking(requestId)
                alert('Your booking has been deleted!')
                navigate('/my-bookings')
            }
        }
    }

    useEffect(() => {
        if (requestId) {
            const booking = selectBooking(requestId)
            setValue('checkInDate', booking?.checkInDate)
            setValue('checkOutDate', booking?.checkOutDate)
        }
    }, [requestId])

    return (
        <div className="container-fluid my-6 grid grid-cols-1 gap-10 px-4 md:grid-cols-4 md:px-12 lg:max-w-6xl">
            <div className="order-2 col-span-2 flex flex-col rounded-md border border-gray-100 p-10 shadow md:order-1">
                <h2 className="text-xl font-bold tracking-tight text-gray-700">
                    {requestId && (
                        <span className="text-md text-gray-500">
                            #{requestId}
                        </span>
                    )}{' '}
                    {requestId ? 'Updating' : 'Confirm'} your request
                </h2>
                <form
                    noValidate
                    className={'flex h-full flex-col'}
                    onSubmit={handleSubmit((data) => handleConfirm(data))}
                >
                    <div className="mt-6 flex-1 space-y-8">
                        <Input
                            disabled={true}
                            {...register('destination')}
                            label={'Destination'}
                            placeholder={'Destination'}
                            className={
                                'h-full rounded-md border border-gray-200'
                            }
                        />
                        <div>
                            <label className="text-sm font-semibold">
                                Check-in Date
                            </label>
                            <Controller
                                name="checkInDate"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        oneTap
                                        placeholder="Select Date"
                                        style={{ width: '100%' }}
                                        value={getValues('checkInDate')}
                                        onChange={(value) => {
                                            onChange(value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold">
                                Check-out Date
                            </label>
                            <Controller
                                name="checkOutDate"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        oneTap
                                        placeholder="Select Date"
                                        style={{ width: '100%' }}
                                        value={getValues('checkOutDate')}
                                        onChange={(value) => {
                                            onChange(value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-gray-400">Total</span>
                            <span className="pl-4 text-2xl font-semibold">
                                ${total}
                            </span>
                        </div>
                    </div>

                    <div className="mb-3 flex flex-col space-y-2">
                        {errors.checkInDate && (
                            <span className="inline-flex items-center text-sm text-red-500">
                                <LuAlertCircle className="pr-2 text-xl" />{' '}
                                {errors.checkInDate.message}
                            </span>
                        )}
                        {errors.checkOutDate && (
                            <span className="inline-flex items-center text-sm text-red-500">
                                <LuAlertCircle className="pr-2 text-xl" />{' '}
                                {errors.checkOutDate.message}
                            </span>
                        )}
                    </div>

                    <div className="fixed bottom-0 left-0 z-[6] mt-8 flex w-full items-center space-x-3 md:relative md:mt-0 ">
                        <Button
                            type={'submit'}
                            className={
                                'text-sm font-semibold uppercase tracking-[.20em]'
                            }
                            text={isEditing ? 'Update' : 'Confirm'}
                        />

                        {isEditing && (
                            <button
                                onClick={() => handleDelete()}
                                className="butto__delete flex h-full w-20 items-center

                            justify-center
                            rounded-lg border border-red-600 text-xl text-red-600 hover:cursor-pointer hover:bg-red-600 hover:text-white hover:duration-300"
                            >
                                <BsTrash3Fill />
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="order-1 col-span-2 flex flex-col rounded-md border border-gray-100 p-10 shadow md:order-2">
                <h2 className="text-2xl font-bold tracking-tight text-gray-700">
                    {place?.title}
                </h2>
                <p className="flex items-center text-gray-600">
                    <SlLocationPin />
                    <span className={'pl-2'}>{place?.location}</span>
                </p>
                <img
                    className="h-full max-h-[500px] w-full py-4"
                    src={place?.image}
                    alt="Booking Image Cover"
                />
                <p className="text-gray-500">{place?.description}</p>
            </div>
        </div>
    )
}

export default Book
