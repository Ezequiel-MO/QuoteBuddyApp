import { useState, useEffect } from 'react'
import { ModalComponent } from '../../../../../../components/atoms/modal/Modal'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../../components/atoms'
import { EventModalContent } from './EventModalContent'

import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../../helper/toast'
import { useModalValidation } from '@hooks/useModalValidation'
import {
	useCurrentProject,
	useSweetAlertCloseDialog,
	useSweetAlertConfirmationDialog
} from '@hooks/index'

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
		screenTextContent: event?.textContent,
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

	// Define custom style for the modal
	const styleModal = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '90vh',
		minWidth: '800px',
		overflow: 'auto',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		padding: 2
	}

	if (loading) {
		return (
			<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
				<div className="flex justify-center items-center h-full">
					<Spinner />
				</div>
			</ModalComponent>
		)
	}

	return (
		<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
			<div className="flex flex-col justify-center items-center">
				<div className="shadow-md rounded-lg w-full">
					<ModalCancelButton handleClose={handleClose} />
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
				<div className="mt-4">
					<ModalConfirmButton handleConfirm={handleConfirm} />
				</div>
			</div>
		</ModalComponent>
	)
}
