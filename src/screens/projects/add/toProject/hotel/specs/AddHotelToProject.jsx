import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import { useCurrentProject } from '../../../../../../hooks'
import { Button } from '../../../../../../ui'
import { AddHotelPricesToProject } from '../forms/AddHotelPricesToProject'
import { DisplayMeetingDays } from './DisplayMeetingDays'
import { useAddHotelToProjectWithRates } from './useAddHotelToProjectWithRates'
import { ToggleMeetingsButton } from '../../renders/ToggleMeetingButton'
import { useHotelRates } from './useHotelRates'
import { useMeetingData } from './useMeetingData'

export const AddHotelToProject = () => {
	const navigate = useNavigate()
	let params = useParams()
	const { currentProject, addHotelToProject } = useCurrentProject()
	const { hotels } = currentProject
	const [meetingsOpen, setMeetingsOpen] = useState(false)
	const { hotelId } = params
	const location = useLocation()
	const { meetingForm, setMeetingForm, handleMeeting } = useMeetingData()
	const { hotelRates, handleChange } = useHotelRates()
	const { postHotelWithPricesToProject } = useAddHotelToProjectWithRates(
		hotels,
		hotelId,
		{
			onSuccess: (hotel, values) => onSuccess(hotel, values),
			onError: (error) => onError(error)
		}
	)

	const onSuccess = (hotel, values) => {
		hotel.price = [values]
		addHotelToProject(hotel)
		toast.success('Hotel added to project', toastOptions)
		navigate('/app/project/schedule')
	}

	const onError = (error) => {
		toast.error(`${error.message}`, toastOptions)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		postHotelWithPricesToProject(hotelRates)
	}
	return (
		<div className="flex flex-col px-5">
			<h1 className="text-2xl uppercase bg-orange-50 text-slate-50 text-center font-bold">
				{' '}
				{location.state.hotelName && location.state.hotelName}
			</h1>
			<form className="relative" onSubmit={handleSubmit}>
				<AddHotelPricesToProject handleChange={handleChange} />
				{/* <div className="mb-10 pl-1">
					<ToggleMeetingsButton
						meetingsOpen={meetingsOpen}
						setMeetingsOpen={setMeetingsOpen}
					/>
					<div className={`${meetingsOpen ? 'block' : 'hidden'}`}>
						<DisplayMeetingDays
							handleMeeting={handleMeeting}
							meetingForm={meetingForm}
							setMeetingForm={setMeetingForm}
						/>
					</div>
				</div> */}
				<div className="ml-4 mt-10">
					<Button type="submit">Add Hotel Rates to project</Button>
				</div>
			</form>
		</div>
	)
}
