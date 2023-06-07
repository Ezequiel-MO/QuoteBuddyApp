import { useState, useEffect } from 'react'
import { ModalComponent } from '../../../../../components/atoms/modal/Modal'
import {
	useCurrentProject,
	useModalValidation,
	useSweetAlertCloseDialog,
	useSweetAlertConfirmationDialog
} from '../../../../../hooks'
import { styleModal } from './helperHotelModal'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../components/atoms'
import { HotelModalContent } from './HotelModalContent'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../helper/toast'

export const HotelModal = ({ open, setOpen, hotel = {} }) => {
	const { editModalHotel } = useCurrentProject()
	const [textContent, setTextContent] = useState()
	const [data, setData] = useState({})
	const [isChecked, setIsChecked] = useState()
	const [imagesHotel, setImagesHotel] = useState([])
	const [loading, setLoading] = useState(Boolean())

	const onSuccess = async () => {
		editModalHotel({
			pricesEdit: data,
			id: hotel._id,
			textContentEdit: textContent,
			imageContentUrlEdit: imagesHotel
		})
		setTimeout(() => {
			setOpen(false)
		}, 1000)
	}

	const onError = (error) => {
		toast.error(error, errorToastOptions)
	}

	const { handleConfirm } = useSweetAlertConfirmationDialog({
		onSuccess,
		onError
	})

	const { validate } = useModalValidation({
		isChecked,
		screenTextContent: hotel.textContent,
		textContent,
		changedImages: imagesHotel,
		originalImages: hotel.imageContentUrl
	})

	const { handleClose } = useSweetAlertCloseDialog({
		setOpen,
		validate
	})

	const modalClose = () => {
		setTextContent(hotel?.textContent)
		setImagesHotel(hotel?.imageContentUrl)
		setOpen(false)
	}

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 500)
	}, [open])

	if (Object.keys(hotel).length === 0) {
		return null
	}

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
			<HotelModalContent
				hotel={hotel}
				data={data}
				setData={setData}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
				textContent={textContent}
				setTextContent={setTextContent}
				imagesHotel={imagesHotel}
				setImagesHotel={setImagesHotel}
			/>
			<ModalConfirmButton handleConfirm={handleConfirm} />
		</ModalComponent>
	)
}
