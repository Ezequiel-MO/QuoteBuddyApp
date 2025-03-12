import { useState, useEffect } from 'react'
import { ModalComponent } from '../../../../../components/atoms/modal/Modal'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../components/atoms'

import { useCurrentProject } from '../../../../../hooks'
import { handleConfirm } from './handlesModalMeeting'
import { IHotel } from '@interfaces/hotel'
import { TableHeadModal } from './TableHeadModal'
import { IMeeting } from '@interfaces/meeting'

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	height: '90%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 2,
	overflowY: 'auto'
}

interface AddMeetingsModalProps {
	hotel: IHotel
	isOpen: boolean // Now passed as a prop
	setOpen: (open: boolean) => void // Now passed as a prop
}

export const AddMeetingsModal: React.FC<AddMeetingsModalProps> = ({
	hotel,
	isOpen,
	setOpen
}) => {
	const [loading, setLoading] = useState(false)
	const [openForm, setOpenForm] = useState<Record<string, boolean>>({})
	const [meetingValues, setMeetingValues] = useState<Record<string, any>>({})
	const { currentProject, addEventToSchedule, editModalMeeting } =
		useCurrentProject()
	const { schedule } = currentProject

	const timesMeeting = [
		{ name: 'Morning', timeOfEvent: 'morningMeetings' },
		{ name: 'Afternoon', timeOfEvent: 'afternoonMeetings' },
		{ name: 'Full Day', timeOfEvent: 'fullDayMeetings' }
	]

	useEffect(() => {
		if (isOpen) {
			setLoading(true)
			setTimeout(() => {
				setLoading(false)
			}, 800)
			const initialOpenFormState: Record<string, boolean> = {}
			const initialValues: Record<string, any> = {}
			for (let i = 0; i < schedule.length; i++) {
				initialOpenFormState[schedule[i].date] = false
				for (let j = 0; j < timesMeeting.length; j++) {
					const timeMeeting = timesMeeting[j].timeOfEvent
					const meetings = schedule[i][timeMeeting]?.meetings as IMeeting[]
					console.log(meetings)
					const findMeetingHotel = meetings.find(el => el?.hotelName === hotel.name)
					if (findMeetingHotel) {
						initialValues[timesMeeting[j].timeOfEvent + '-' + i] = findMeetingHotel
					} else {
						initialValues[timesMeeting[j].timeOfEvent + '-' + i] = {}
					}
				}
			}
			setOpenForm(initialOpenFormState)
			setMeetingValues(initialValues)
		}
	}, [isOpen, schedule])

	const handleModalClose = () => {
		setOpen(false)
	}

	const handleButtonClose = () => {
		setOpenForm({})
		setMeetingValues({})
		setOpen(false)
	}

	const handleButtonConfirm = () =>
		handleConfirm({
			meetingValues,
			addEventToSchedule,
			editModalMeeting,
			hotel,
			setOpen,
			currentProject
		})

	if (loading) {
		return (
			<ModalComponent open={isOpen} setOpen={setOpen} styleModal={styleModal}>
				<div style={{ marginTop: '200px' }}>
					<Spinner />
				</div>
			</ModalComponent>
		)
	}

	return (
		<ModalComponent
			open={isOpen}
			setOpen={handleModalClose}
			styleModal={styleModal}
		>
			<ModalCancelButton handleClose={handleButtonClose} />
			<h1 style={{ textAlign: 'center', fontSize: '20px' }}>{hotel.name}</h1>
			{schedule.map((day, index) => (
				<div key={day._id || `day-${index}`}>
					<TableHeadModal
						dayOfEvent={index}
						day={day}
						openForm={openForm}
						setOpenForm={setOpenForm}
						meetingValues={meetingValues}
						setMeetingValues={setMeetingValues}
					/>
				</div>
			))}
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<ModalConfirmButton
					text="ADD MEETING/S"
					handleConfirm={handleButtonConfirm}
				/>
			</div>
		</ModalComponent>
	)
}
