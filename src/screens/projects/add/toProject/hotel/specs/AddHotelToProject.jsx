import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import { useCurrentProject } from '../../../../../../hooks/useCurrentProject'
import { Button } from '../../../../../../ui'
import { AddHotelPricesToProject } from '../forms/AddHotelPricesToProject'
import { DisplayMeetingDays } from './DisplayMeetingDays'
import { usePostHotelWithPricesToProject } from './usePostHotelWithPricesToProject'

export const AddHotelToProject = () => {
	const navigate = useNavigate()
	let params = useParams()
	const { currentProject, addHotelToProject } = useCurrentProject()
	const { hotels } = currentProject
	const [meetingsOpen, setMeetingsOpen] = useState(false)
	const [meetingForm, setMeetingForm] = useState({
		date: '',
		dayOfEvent: '',
		open: false,
		timing: '',
		timeOfEvent: ''
	})
	const [hotelRates, setHotelRates] = useState({
		DUInr: '',
		DUIprice: '',
		breakfast: '',
		DoubleRoomNr: '',
		DoubleRoomPrice: '',
		DailyTax: ''
	})
	const { hotelId } = params
	const location = useLocation()

	const { postHotelWithPricesToProject } = usePostHotelWithPricesToProject(
		hotels,
		hotelId,
		addHotelToProject,
		{
			onSuccess: (hotel, values) => {
				toast.success('Hotel added to project', toastOptions)
				navigate('/app/project/schedule')
				hotel.price = [values]
				addHotelToProject(hotel)
			},
			onError: () => {
				toast.error('Error adding hotel to project', toastOptions)
			}
		}
	)

	const handleChange = (e) => {
		const { name, value } = e.target
		setHotelRates((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		})
	}

	const handleMeeting = (dayOfEvent, timing, timeOfEvent, date) => {
		setMeetingForm({
			...meetingForm,
			date,
			dayOfEvent,
			open,
			timing,
			timeOfEvent
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		postHotelWithPricesToProject(hotelRates)
	}
	return (
		<div className="flex flex-col">
			<h1 className="text-2xl uppercase bg-orange-50 text-slate-50 text-center font-bold">
				{' '}
				{location.state.hotelName && location.state.hotelName}
			</h1>
			<form className="relative" onSubmit={handleSubmit}>
				<AddHotelPricesToProject handleChange={handleChange} />
				<div className="mb-10 pl-1">
					<Button
						type="button"
						handleClick={() => setMeetingsOpen(!meetingsOpen)}
						className="flex flex-row justify-start"
					>
						ADD MEETINGS
						<Icon icon="bi:box-arrow-in-down-right" color="#ea5933" />
					</Button>
					<div className={`${meetingsOpen ? 'block' : 'hidden'}`}>
						<DisplayMeetingDays
							handleMeeting={handleMeeting}
							meetingForm={meetingForm}
							setMeetingForm={setMeetingForm}
						/>
					</div>
				</div>
				<div className="ml-4 mt-10">
					<Button type="submit">Add Hotel Rates to project</Button>
				</div>
			</form>
		</div>
	)
}
