import { useState, useEffect, FC } from 'react'
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
import { IMeeting } from '@interfaces/meeting'


const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '85%',
	height: '40%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 2,
	overflowY: 'auto'
}

interface MeetingModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	meeting?: IMeeting;
	timeOfEvent: "fullDayMeetings" | "morningMeetings" | "afternoonMeetings";
	dayIndex: number
}

export const MeetingModal: FC<MeetingModalProps> = ({
	open,
	setOpen,
	meeting,
	dayIndex,
	timeOfEvent
}) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<Record<string, number>>({})
	const [isChecked, setIsChecked] = useState<Record<string, boolean>>({})
	const { editModalMeeting } = useCurrentProject()

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 800)
	}, [open])


	const onSuccess = async () => {
		if (!meeting) {
			throw new Error("Meeting not found")
		}
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
			typeOfEvent: timeOfEvent
		})
		setTimeout(() => {
			setOpen(false)
		}, 500)
	}

	const onError = async (error: any) => {
		toast.error(error.message, errorToastOptions)
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
				timeOfEvent={timeOfEvent}
				data={data}
				setData={setData}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
				dayIndex={dayIndex}
			/>
			<div className='flex justify-end'>
				<ModalConfirmButton handleConfirm={() => handleConfirm()} />
			</div>
		</ModalComponent>
	)
}
