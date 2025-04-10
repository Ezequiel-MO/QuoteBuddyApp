import React, { useState, useEffect, FC } from 'react'
import { ModalComponent } from '../../../../../../components/atoms/modal/Modal'
import { ModalCancelButton, Spinner } from '../../../../../../components/atoms'

import { IntroModalContent } from './IntroModalContent'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../../helper/toast'
import {
	IActivity,
	IMeal,
	IMeetingDetails,
	IOvernight,
	IItinerary
} from 'src/interfaces/project'
import { TimeOfEvent } from 'src/redux/features/currentProject/types'
import {
	useCurrentProject,
	useModalValidation,
	useSweetAlertCloseDialog,
	useSweetAlertConfirmationDialog
} from '@hooks/index'

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '60%',
	height: '85%',
	bgcolor: 'transparent',
	boxShadow: 24,
	p: 0,
	outline: 'none',
	border: 'none'
}

/**
 * Formats event type string for display
 * @param eventType - The event type to format (e.g., "morningEvents", "lunch")
 * @returns Formatted event type string
 */
const formatEventTitle = (eventType: string): string => {
	// Handle simple event types directly
	const simpleEvents: Record<string, string> = {
		lunch: 'Lunch',
		dinner: 'Dinner',
		breakfast: 'Breakfast',
		morningEvents: 'Morning Events',
		afternoonEvents: 'Afternoon Events',
		morningActivity: 'Morning Activity',
		afternoonActivity: 'Afternoon Activity',
		nightActivity: 'Night Activity'
	}

	if (simpleEvents[eventType]) {
		return simpleEvents[eventType]
	}

	// For other cases, use regex to insert spaces before capital letters
	return eventType
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.toLowerCase()
}

interface IntroModalProps {
	day: string
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	eventType: TimeOfEvent
	dayIndex: number
	events: IActivity | IMeal | IMeetingDetails | IOvernight | IItinerary
	isItinerary?: boolean
}

export const IntroModal: FC<IntroModalProps> = ({
	day,
	open,
	setOpen,
	eventType,
	dayIndex,
	events,
	isItinerary = false
}) => {
	const { addIntro, addIntroToEventItinerary } = useCurrentProject()
	const [loading, setLoading] = useState<boolean>(false)
	const [textContent, setTextContent] = useState<string>('')
	const [titleActivity, setTitleActivity] = useState<string>('')
	const [screen, setScreen] = useState<{ textContent: string }>({
		textContent: ''
	})

	useEffect(() => {
		setLoading(true)
		setScreen({ textContent: events?.intro || '' })
		if (open) {
			setTitleActivity(formatEventTitle(eventType))
		}
		setTimeout(() => {
			setLoading(false)
		}, 800)
	}, [open, events?.intro, eventType])

	const onSuccess = async () => {
		if (isItinerary) {
			const typeOfEvent = eventType as
				| 'lunch'
				| 'dinner'
				| 'morningActivity'
				| 'afternoonActivity'
				| 'nightActivity'
			addIntroToEventItinerary({
				dayIndex,
				typeOfEvent,
				textContent: textContent || ''
			})
		} else {
			addIntro({
				dayIndex,
				typeEvent: eventType,
				textContent: textContent || ''
			})
		}
		toast.success('Intro saved successfully!', {
			position: 'top-right',
			autoClose: 3000
		})
		setTimeout(() => {
			setOpen(false)
		}, 1000)
	}

	const onError = async (error: any) => {
		console.error(error)
		toast.error(error.message, errorToastOptions)
	}

	const { validate } = useModalValidation({
		screenTextContent: screen?.textContent,
		textContent: textContent
	})

	const modalClose = () => {
		setTextContent('')
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
				<div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-90 rounded-lg">
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
				handleConfirm={handleConfirm}
			/>
		</ModalComponent>
	)
}
