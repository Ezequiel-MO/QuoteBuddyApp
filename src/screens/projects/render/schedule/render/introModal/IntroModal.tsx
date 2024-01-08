import React, { useState, useEffect, FC } from 'react'
import { ModalComponent } from '../../../../../../components/atoms/modal/Modal'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../../components/atoms'
import {
	useCurrentProject,
	useModalValidation,
	useSweetAlertConfirmationDialog,
	useSweetAlertCloseDialog
} from '../../../../../../hooks'
import { IntroModalContent } from './IntroModalContent'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../../helper/toast'
import { titleByEvent } from "./helpers"
import { IActivity, IMeal, IMeetingDetails, IOvernight } from "src/interfaces/project"

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	height: '80%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 2
}

interface IntroModalProps {
	day: string
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	eventType: string
	dayIndex: number
	events: IActivity | IMeal | IMeetingDetails | IOvernight
	isItinerary?: boolean
}

export const IntroModal: FC<IntroModalProps> = ({
	day,
	open,
	setOpen,
	eventType,
	dayIndex,
	events,
	isItinerary
}) => {
	const {
		addIntroRestaurant,
		addIntroEvent,
		addIntroMeeting,
		addIntroHotelOvernight,
		addIntroEventItinerary
	} = useCurrentProject()
	const [loading, setLoading] = useState(Boolean())
	const [textContent, setTextContent] = useState<string>()
	const [titleActivity, seTitleActivity] = useState(eventType)
	const [screen, setScreen] = useState({ textContent: "" })
	const eventsAndMeetings = [
		'morningEvents',
		'morningMeetings',
		'afternoonEvents',
		'afternoonMeetings',
		'fullDayMeetings'
	]


	useEffect(() => {
		setLoading(true)
		setScreen({ textContent: events?.intro })
		if (eventsAndMeetings.includes(eventType) && open) {
			seTitleActivity(titleByEvent(eventType))
		}
		setTimeout(() => {
			setLoading(false)
		}, 800)
	}, [open])

	const onSuccess = async () => {
		if (!isItinerary && ['lunch', 'dinner'].includes(eventType)) {
			addIntroRestaurant({
				dayIndex,
				typeEvent: eventType,
				textContent: textContent || ""
			})
		}
		if (['morningEvents', 'afternoonEvents'].includes(eventType)) {
			addIntroEvent({
				dayIndex,
				typeEvent: eventType,
				textContent: textContent || ""
			})
		}
		if (['morningMeetings', 'afternoonMeetings', 'fullDayMeetings'].includes(eventType)) {
			addIntroMeeting({
				dayIndex: dayIndex,
				typeEvent: eventType,
				textContent: textContent || ""
			})
		}
		//condicion para "Multi Destination"(Itinerary)
		if (eventType === "overnight") {
			addIntroHotelOvernight({
				dayIndex,
				typeEvent: eventType,
				textContent: textContent || ""
			})
		}
		if (isItinerary) {
			const typeOfEvent = eventType as "lunch" | "dinner" | "activity"
			addIntroEventItinerary({
				dayIndex,
				typeOfEvent,
				textContent: textContent || ""
			})
		}
		setTimeout(() => {
			setOpen(false)
		}, 1000)
	}

	const onError = async (error: any) => {
		console.log(error)
		toast.error(error.message, errorToastOptions)
	}

	const { validate } = useModalValidation({
		screenTextContent: screen?.textContent,
		textContent: textContent
	})

	const modalClose = () => {
		setTextContent("")
		setOpen(false)
	}

	const { handleClose } = useSweetAlertCloseDialog({
		setOpen: setOpen,
		validate
	})

	const { handleConfirm } = useSweetAlertConfirmationDialog({
		onSuccess,
		onError
	})

	if (loading) {
		return (
			<ModalComponent open={open} setOpen={modalClose} styleModal={styleModal}>
				<div style={{ marginTop: '200px' }}>
					<Spinner />
				</div>
			</ModalComponent>
		)
	}

	return (
		<ModalComponent open={open} setOpen={modalClose} styleModal={styleModal}>
			<ModalCancelButton handleClose={handleClose} />
			<IntroModalContent
				day={day}
				typeEvent={titleActivity}
				textContent={textContent}
				setTextContent={setTextContent}
				events={events}
				screen={screen}
			/>
			<ModalConfirmButton handleConfirm={handleConfirm} />
		</ModalComponent>
	)
}
