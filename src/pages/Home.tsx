import Input from '../components/ui/input'
import Listings from '../components/listings'
import React, { useEffect, useState } from 'react'
import { useBooking } from '../context'
import { useNavigate } from 'react-router-dom'
import { PlaceType } from '../types/place.type'
import clsx from 'clsx'

const Home = () => {
    const [searchField, setSearchField] = useState('')
    const { state } = useBooking()
    const navigate = useNavigate()

    const [filteredData, setFilteredData] = useState([])

    const onSearchChange = (e: any) => {
        const searchFieldString = e.target.value.toLocaleLowerCase()
        setSearchField(searchFieldString)
    }

    useEffect(() => {
        if (searchField.length === 0) {
            setFilteredData(state.data)
        }
        const filteredData = state.data.filter((item: PlaceType) =>
            item.title.toLocaleLowerCase().includes(searchField.toLowerCase())
        )
        setFilteredData(filteredData)
    }, [searchField])

    const onSelect = (item: any) => {
        navigate(`/booking/${item.id}`)
    }

    return (
        <div
            className={clsx(
                'mx-auto max-w-7xl py-6 sm:px-6 lg:px-8',
                filteredData.length && '!w-full'
            )}
        >
            <div className="flex h-12 justify-between space-x-4 px-4 sm:px-0">
                <Input
                    placeholder={'Search by name'}
                    onChange={onSearchChange}
                    className={'h-full rounded-md border border-gray-200'}
                />
            </div>
            <div className={'container-fluid mt-5 px-4 lg:px-0'}>
                <Listings
                    data={filteredData}
                    select={(item: any) => onSelect(item)}
                />
            </div>
        </div>
    )
}

export default Home
