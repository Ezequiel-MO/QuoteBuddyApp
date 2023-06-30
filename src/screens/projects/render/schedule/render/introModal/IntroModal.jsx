import { useState, useEffect } from 'react'
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

export const IntroModal = ({
	day,
	open,
	setOpen,
	eventType,
	dayIndex,
	events
}) => {
	const { addIntroRestaurant , addIntroEvent } = useCurrentProject()
	const [loading, setLoading] = useState(Boolean())
	const [textContent, setTextContent] = useState()
	const [titleActivity, seTitleActivity] = useState(eventType)
	const [screen, setScreen] = useState({})


	useEffect(() => {
		setLoading(true)
		setScreen({ textContent: events?.intro })
		if (['morningEvents', 'afternoonEvents'].includes(eventType) && open) {
			seTitleActivity(titleByEvent(eventType))
		}
		setTimeout(() => {
			setLoading(false)
		}, 800)
	}, [open])

	const onSuccess = async () => {
		if (['lunch', 'dinner'].includes(eventType)) {
			addIntroRestaurant({
				dayIndex: dayIndex,
				typeEvent: eventType,
				textContent
			})
		}
		if (['morningEvents', 'afternoonEvents'].includes(eventType)) {
			addIntroEvent({
				dayIndex: dayIndex,
				typeEvent: eventType,
				textContent
			})
		}
		setTimeout(() => {
			setOpen(false)
		}, 1000)
	}
	const onError = async (error) => {
		toast.error(error, errorToastOptions)
	}

	const { validate } = useModalValidation({
		screenTextContent: screen?.textContent,
		textContent: textContent
	})

	const modalClose = () => {
		setTextContent()
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
			<ModalConfirmButton handleConfirm={() => handleConfirm()} />
		</ModalComponent>
	)
}
