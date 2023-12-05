import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import { useCurrentProject } from '../../../../../../hooks'
import { AddHotelPricesToProject } from '../forms/AddHotelPricesToProject'
import { useAddHotelToProjectWithRates } from './useAddHotelToProjectWithRates'
import { useHotelRates } from './useHotelRates'
import { Button } from '@components/atoms'
import { IHotel } from "src/interfaces"

interface IHotelRates {
	DUInr: number
	DUIprice: number
	breakfast: number
	DoubleRoomNr: number
	DoubleRoomPrice: number
	DailyTax: number
}

export const AddHotelToProject = () => {
	const navigate = useNavigate()
	let params = useParams()
	const { currentProject, addHotelToProject, addHotelOvernightToSchedule } = useCurrentProject()
	const { hotels } = currentProject
	const { hotelId } = params
	const location = useLocation()
	const { hotelRates, handleChange } = useHotelRates()
	const { postHotelWithPricesToProject } = useAddHotelToProjectWithRates(
		hotels,
		hotelId,
		{
			onSuccess: (hotel: IHotel, values: IHotelRates) => onSuccess(hotel, values),
			onError: (error: any) => onError(error)
		}
	)

	const onSuccess = (hotel: IHotel, values: IHotelRates) => {
		hotel.price = [values]
		addHotelToProject(hotel)
		if (location.state.dayOfEvent !== null) {
			addHotelOvernightToSchedule({
				dayIndex: location.state.dayOfEvent,
				hotel
			})
		}
		toast.success('Hotel added to project', toastOptions)
		navigate('/app/project/schedule')
	}

	const onError = (error: any) => {
		toast.error(`${error.message}`, toastOptions)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		postHotelWithPricesToProject(hotelRates)
	}
	return (
		<div className="flex flex-col px-5">
			<h1 className="text-2xl uppercase bg-orange-50 text-slate-50 text-center font-bold">
				{location.state.hotelName && location.state.hotelName}
			</h1>
			<form className="relative" onSubmit={handleSubmit}>
				<AddHotelPricesToProject handleChange={handleChange} />
				<div className="ml-4 mt-10">
					<Button icon='' type="submit">Add Hotel Rates to project</Button>
				</div>
			</form>
		</div>
	)
}
