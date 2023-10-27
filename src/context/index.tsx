import { createContext, ReactNode, useContext, useReducer } from 'react'
import { PlaceType } from '../types/place.type'
import initialData from '../data'
import { BookingType } from '../types/booking.type'

const initialState = {
    data: initialData,
    myBookings: [],
}

export interface BookingState {
    myBookings: BookingType[]
    data: PlaceType[]
}

type Action =
    | { type: 'ADD_BOOKING'; payload: BookingType }
    | { type: 'REMOVE_BOOKING'; payload: string }
    | { type: 'UPDATE_BOOKING'; payload: { id: string; booking: BookingType } }

const BookingContext = createContext<any | undefined>(undefined)

function bookingReducer(state: BookingState, action: Action) {
    switch (action.type) {
        case 'ADD_BOOKING':
            return {
                ...state,
                myBookings: [...state.myBookings, action.payload],
            }
        case 'REMOVE_BOOKING':
            return {
                ...state,
                myBookings: state.myBookings.filter(
                    (booking: BookingType) => booking.id !== action.payload
                ),
            }
        case 'UPDATE_BOOKING':
            return {
                ...state,
                myBookings: state.myBookings.map((booking: BookingType) => {
                    if (booking.id === action.payload.id) {
                        return action.payload.booking
                    }
                    return booking
                }),
            }
        default:
            return state
    }
}

export function BookingProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(bookingReducer, initialState)

    const addBooking = (booking: BookingType) => {
        const find = state.myBookings.find(
            (item) => item.placeId === booking.placeId
        )

        if (!find) {
            dispatch({ type: 'ADD_BOOKING', payload: booking })
            return true
        }
        return false
    }

    const updateBooking = (id: string, booking: BookingType) => {
        dispatch({ type: 'UPDATE_BOOKING', payload: { id, booking } })
    }

    const removeBooking = (bookingId: string) => {
        dispatch({ type: 'REMOVE_BOOKING', payload: bookingId })
    }

    const selectPlace = (placeId: string) => {
        return state.data.find((place: PlaceType) => place.id === placeId)
    }

    const selectBooking = (bookingId: string) => {
        return state.myBookings.find(
            (booking: BookingType) => booking.id === bookingId
        )
    }

    return (
        <BookingContext.Provider
            value={{
                state,
                addBooking,
                removeBooking,
                updateBooking,
                selectPlace,
                selectBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    )
}

export function useBooking() {
    return useContext(BookingContext)
}
