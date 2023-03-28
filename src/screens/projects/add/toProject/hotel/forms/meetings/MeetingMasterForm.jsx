import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../../helper/toast'
import { useCurrentProject, useGetHotel } from '../../../../../../../hooks'
import { Button } from '../../../../../../../ui'
import { MeetingFBInputs } from './MeetingFBInputs'
import { MeetingRentalsInputs } from './MeetingRentalInputs'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const MeetingMasterForm = ({
	date,
	timing,
	meetingForm,
	setMeetingForm
}) => {
	const quillRef = useRef()
	const fileInput = useRef()
	let params = useParams()
	const { hotelId } = params

	const { hotel } = useGetHotel(hotelId)
	const { addEventToSchedule } = useCurrentProject()
	const [intro, setIntro] = useState('')
	const [meetingValues, setMeetingValues] = useState({
		roomCapacity: '',
		HDRate: '',
		HDDDR: '',
		FDRate: '',
		FDDDR: '',
		aavvPackage: '',
		coffeeBreakUnits: '',
		coffeeBreakPrice: '',
		workingLunchUnits: '',
		workingLunchPrice: '',
		hotelDinnerUnits: '',
		hotelDinnerPrice: ''
	})

	const handleQuillChange = (introduction) => {
		setIntro(introduction)
	}

	const handleMeetingChange = (e) => {
		const { name, value } = e.target
		setMeetingValues((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		})
	}

	const addMeetingToSchedule = () => {
		let event = { ...meetingValues }
		event.introduction = intro
		event.hotel = [hotelId]
		event.hotelName = hotel.name

		addEventToSchedule({
			dayOfEvent: meetingForm.dayOfEvent,
			timeOfEvent: meetingForm.timeOfEvent,
			event
		})

		toast.success('Meeting Values added', toastOptions)

		setMeetingValues((prevState) => {
			return {
				...prevState,
				roomCapacity: '',
				HDRate: '',
				HDDDR: '',
				FDRate: '',
				FDDDR: '',
				aavvPackage: '',
				coffeeBreakUnits: '',
				coffeeBreakPrice: '',
				workingLunchUnits: '',
				workingLunchPrice: '',
				hotelDinnerUnits: '',
				hotelDinnerPrice: ''
			}
		})

		setMeetingForm((prevState) => {
			return {
				...prevState,
				isDispatched: true,
				open: false
			}
		})
	}

	return (
		<div className="flex flex-col justify-end items-start">
			<h1>{`${timing} on ${date}`}</h1>
			<fieldset className="grid grid-cols-2 gap-x-4">
				<MeetingRentalsInputs
					handleMeetingChange={handleMeetingChange}
					meetingValues={meetingValues}
					fileInput={fileInput}
					timing={timing}
				/>
				<MeetingFBInputs
					handleMeetingChange={handleMeetingChange}
					meetingValues={meetingValues}
				/>
				<div className="my-2 bg-black-50 text-white-100 col-span-2">
					<ReactQuill
						name="introduction"
						value={intro}
						placeholder="Write a short description of the meeting"
						onChange={handleQuillChange}
						ref={quillRef}
					/>
				</div>
				<div className="flex items-center justify-start mt-2">
					<div>
						<Button type="button" handleClick={addMeetingToSchedule}>
							Add Meeting
						</Button>
					</div>
				</div>
			</fieldset>
		</div>
	)
}
