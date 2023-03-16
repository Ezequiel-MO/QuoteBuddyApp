import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../../helper/toast'
import { useCurrentProject } from '../../../../../../../hooks'
import { Button, NumberInput } from '../../../../../../../ui'
import { FileUpload } from './FileUpload'
import { FullDayRateInputs } from './FullDayInputs'
import { HalfDayRateInputs } from './HalfDayInputs'
import { MeetingFBInputs } from './MeetingFBInputs'

export const MeetingMasterForm = ({
	date,
	timing,
	meetingForm,
	setMeetingForm
}) => {
	let params = useParams()
	const { hotelId } = params
	const fileInput = useRef()
	const { addEventToSchedule } = useCurrentProject()
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
		hotelDinnerPrice: '',
		introduction: ''
	})

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

		event.introduction = [meetingValues.introduction]
		event.hotel = [hotelId]

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
				hotelDinnerPrice: '',
				introduction: ''
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
			<fieldset className="grid grid-cols-4 gap-x-4">
				<div className="grid grid-cols-2 gap-x-4">
					<div>
						<NumberInput
							label="Room Capacity"
							name="roomCapacity"
							placeholder="Ex. 100"
							handleChange={handleMeetingChange}
							value={meetingValues.roomCapacity}
							type="number"
						/>
						<NumberInput
							label="Audiovisuals"
							name="aavvPackage"
							placeholder="Ex. 3000"
							handleChange={handleMeetingChange}
							value={meetingValues.aavvPackage}
							type="number"
						/>
						<FileUpload fileInput={fileInput} />
					</div>
					<div>
						<HalfDayRateInputs
							timing={timing}
							handleMeetingChange={handleMeetingChange}
							meetingValues={[meetingValues.HDRate, meetingValues.HDDDR]}
						/>
						<FullDayRateInputs
							timing={timing}
							handleMeetingChange={handleMeetingChange}
							meetingValues={[meetingValues.FDRate, meetingValues.FDDDR]}
						/>
					</div>
				</div>

				<MeetingFBInputs
					handleMeetingChange={handleMeetingChange}
					meetingValues={meetingValues}
				/>

				<div>
					<textarea
						name="introduction"
						onChange={handleMeetingChange}
						value={meetingValues.introduction}
						placeholder="Write a short description of the meeting"
						type="text"
						className="w-[500px] h-[200px] rounded p-4"
					/>
					<div className="flex items-center justify-start mt-2">
						<div>
							<Button type="button" handleClick={addMeetingToSchedule}>
								Add Meeting
							</Button>
						</div>
					</div>
				</div>
			</fieldset>
		</div>
	)
}
