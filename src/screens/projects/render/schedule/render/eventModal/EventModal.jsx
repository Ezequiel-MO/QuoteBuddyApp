import { useState, useEffect } from 'react'
import { ModalComponent } from '../../../../../../components/atoms/modal/Modal'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../../components/atoms'
import { EventModalContent } from './EventModalContent'
import {
	useCurrentProject,
	useModalValidation,
	useSweetAlertConfirmationDialog,
	useSweetAlertCloseDialog
} from '../../../../../../hooks'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../../helper/toast'

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
	p: 2
}

export const EventModal = ({
	open,
	setOpen,
	event = {},
	dayIndex,
	typeOfEvent
}) => {
	const { editModalEvent, editModalRestaurant } = useCurrentProject()
	const [loading, setLoading] = useState(false)
	const [imagesEvent, setImagesEvent] = useState([])
	const [textContent, setTextContent] = useState()
	const [data, setData] = useState({})
	const [isChecked, setIsChecked] = useState()

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 800)
	}, [open])

	const onSuccess = async () => {
		if (typeOfEvent !== 'lunch' && typeOfEvent !== 'dinner') {
			editModalEvent({
				id: event._id,
				dayIndex,
				typeOfEvent,
				data,
				imagesEvent,
				textContent
			})
		} else {
			editModalRestaurant({
				id: event._id,
				dayIndex,
				typeOfEvent,
				data,
				imagesEvent,
				textContent
			})
		}
		setTimeout(() => {
			setOpen(false)
		}, 300)
	}

	const onError = (error) => {
		toast.error(error, errorToastOptions)
	}

	const { validate } = useModalValidation({
		isChecked: isChecked,
		screenTextContent: event.textContent,
		textContent: textContent,
		changedImages: imagesEvent,
		originalImages: event?.imageContentUrl
	})

	const { handleClose } = useSweetAlertCloseDialog({
		setOpen: setOpen,
		validate: validate
	})

	const { handleConfirm } = useSweetAlertConfirmationDialog({
		onSuccess,
		onError
	})

	if (Object.keys(event).length === 0) {
		return null
	}

	if (loading) {
		return (
			<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
				<div style={{ marginTop: '200px' }}>
					<Spinner />
				</div>
			</ModalComponent>
		)
	}

	return (
		<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
			<ModalCancelButton handleClose={handleClose} />
			<div className="container w-3/4 flex flex-col bord">
				<EventModalContent
					event={event}
					textContent={textContent}
					setTextContent={setTextContent}
					imagesEvent={imagesEvent}
					setImagesEvent={setImagesEvent}
					data={data}
					setData={setData}
					isChecked={isChecked}
					setIsChecked={setIsChecked}
				/>
			</div>
			<ModalConfirmButton handleConfirm={handleConfirm} />
		</ModalComponent>
	)
}
