import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import { useCurrentProject } from '../../../../../../hooks'
import { Button, NumberInput } from '../../../../../../ui'

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
		<div className="text-slate-50">
			<h1 className="font-bold uppercase underline underline-offset-4">{`${timing} on ${date}`}</h1>
			<fieldset className="grid grid-cols-7">
				<div className="w-[120px] ">
					<NumberInput
						label="Room Capacity"
						name="roomCapacity"
						placeholder="Ex. 100"
						handleChange={handleMeetingChange}
						value={meetingValues.roomCapacity}
						type="number"
					/>
					{timing !== 'All day' ? (
						<>
							<NumberInput
								label="HD Rental"
								name="HDRate"
								placeholder="Ex. 1500"
								handleChange={handleMeetingChange}
								value={meetingValues.HDRate}
								type="number"
							/>
							<NumberInput
								label="HD Delegate.Rate"
								name="HDDDR"
								placeholder="Ex. 60"
								value={meetingValues.HDDDR}
								handleChange={handleMeetingChange}
								type="number"
							/>
						</>
					) : (
						<>
							<NumberInput
								label="Full Day Rental"
								name="FDRate"
								placeholder="Ex. 2600"
								value={meetingValues.FDRate}
								handleChange={handleMeetingChange}
								type="number"
							/>
							<NumberInput
								label="FD Delegate.Rate"
								name="FDDDR"
								placeholder="Ex. 120"
								value={meetingValues.FDDDR}
								handleChange={handleMeetingChange}
								type="number"
							/>
						</>
					)}

					<NumberInput
						label="Audiovisuals"
						name="aavvPackage"
						placeholder="Ex. 3000"
						handleChange={handleMeetingChange}
						value={meetingValues.aavvPackage}
						type="number"
					/>
				</div>
				<div className="w-[120px] ">
					<NumberInput
						label="Coffee Break Units"
						name="coffeeBreakUnits"
						placeholder="Ex. 45"
						handleChange={handleMeetingChange}
						value={meetingValues.coffeeBreakUnits}
						type="number"
					/>
					<NumberInput
						label="Coffee Break Price"
						name="coffeeBreakPrice"
						placeholder="Ex. 40"
						handleChange={handleMeetingChange}
						value={meetingValues.coffeeBreakPrice}
						type="number"
					/>
					<NumberInput
						label="Lunch units"
						name="workingLunchUnits"
						placeholder="Ex. 40"
						handleChange={handleMeetingChange}
						value={meetingValues.workingLunchUnits}
						type="number"
					/>
					<NumberInput
						label="Lunch price"
						name="workingLunchPrice"
						placeholder="Ex. 40"
						handleChange={handleMeetingChange}
						value={meetingValues.workingLunchPrice}
						type="number"
					/>
				</div>
				<div className="w-[100px] ">
					<NumberInput
						label="Dinner units"
						name="hotelDinnerUnits"
						placeholder="Ex. 40"
						handleChange={handleMeetingChange}
						value={meetingValues.hotelDinnerUnits}
						type="number"
					/>
					<NumberInput
						label="Dinner price"
						name="hotelDinnerPrice"
						placeholder="Ex. 82"
						handleChange={handleMeetingChange}
						value={meetingValues.hotelDinnerPrice}
						type="number"
					/>
				</div>
				<div className="">
					<textarea
						name="introduction"
						onChange={handleMeetingChange}
						value={meetingValues.introduction}
						className="
                     px-3
                     py-1.5
                     rounded-sm
                     mt-7
                     w-[520px]
                     h-[150px]
                     focus:text-gray-700 focus:outline-none
                   "
						placeholder="Write a short meeting description"
						type="text"
					/>
					<div className="flex flex-row w-[520px] justify-around items-center mt-5">
						<div className="flex align-center justify-start">
							<label htmlFor="file-upload" className="custom-file-upload">
								<Icon icon="akar-icons:cloud-upload" width="40" />
							</label>
							<input
								id="file-upload"
								className="cursor-pointer"
								type="file"
								ref={fileInput}
								name="imageContentUrl"
								multiple
							/>
						</div>
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
