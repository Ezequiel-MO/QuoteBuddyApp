import { useState, useEffect } from 'react'
import { ModalComponent } from '../../../../../components/atoms/modal/Modal'
import {
	useModalValidation,
	useSweetAlertCloseDialog,
	useSweetAlertConfirmationDialog,
	useLoadHotelData
} from '../../../../../hooks'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../components/atoms'
import { HotelModalContent } from './HotelModalContent'
import { useEditHotelModal } from './useEditHotelModal'

export const HotelModal = ({ open, setOpen, hotel = {} }) => {
	const [isChecked, setIsChecked] = useState()
	const [loading, setLoading] = useState(false)

	const { textContent, setTextContent, imagesHotel, setImagesHotel } =
		useLoadHotelData(open, hotel)

	const { data, setData, onSuccess, onError } = useEditHotelModal({
		hotel,
		textContent,
		imagesHotel,
		setOpen
	})

	const { validate } = useModalValidation({
		isChecked,
		screenTextContent: hotel.textContent,
		textContent,
		changedImages: imagesHotel,
		originalImages: hotel.imageContentUrl
	})

	const { handleConfirm } = useSweetAlertConfirmationDialog({
		onSuccess,
		onError
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

	return (
		<ModalComponent
			open={open}
			setOpen={modalClose}
			className="max-h-screen overflow-y-auto"
		>
			<div className="relative bg-white-0 dark:bg-gray-50 dark:text-white-0 rounded-lg">
				<ModalCancelButton handleClose={handleClose} />
				{loading ? (
					<Spinner />
				) : (
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
				)}
				<div className="absolute bottom-0 right-0 mb-4 mr-4">
					<ModalConfirmButton handleConfirm={handleConfirm} />
				</div>
			</div>
		</ModalComponent>
	)
}
