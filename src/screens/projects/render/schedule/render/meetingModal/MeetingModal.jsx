import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { ModalComponent } from '../../../../../../components/atoms/modal/Modal'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../../components/atoms'

import { errorToastOptions } from '../../../../../../helper/toast'
import { MeetingModalContent } from './MeetingModalContent'
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
	width: '80%',
	height: '90%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 2,
	overflowY: 'auto'
}

export const MeetingModal = ({
	open,
	setOpen,
	meeting = {},
	dayIndex,
	typeOfEvent
}) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({})
	const [isChecked, setIsChecked] = useState()
	const { editModalMeeting } = useCurrentProject()

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 800)
	}, [open])

	const onSuccess = async () => {
		const updateData = {
			...data,
			_id: meeting._id,
			hotelName: meeting.hotelName,
			hotel: meeting.hotel
		}
		editModalMeeting({
			data: updateData,
			id: meeting._id,
			dayIndex,
			typeOfEvent
		})
		setTimeout(() => {
			setOpen(false)
		}, 300)
	}
	const onError = async (error) => {
		toast.error(error, errorToastOptions)
	}

	const { validate } = useModalValidation({
		isChecked: isChecked
	})

	const { handleClose } = useSweetAlertCloseDialog({
		setOpen: setOpen,
		validate: validate
	})
	const { handleConfirm } = useSweetAlertConfirmationDialog({
		onSuccess,
		onError
	})

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
			<MeetingModalContent
				meeting={meeting}
				typeOfEvent={typeOfEvent}
				data={data}
				setData={setData}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
			/>
			<ModalConfirmButton handleConfirm={(e) => handleConfirm(e)} />
		</ModalComponent>
	)
}
