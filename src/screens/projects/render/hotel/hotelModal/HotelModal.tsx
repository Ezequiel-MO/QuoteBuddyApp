import React, { useState, useEffect, FC } from 'react'

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
import { IHotel } from "src/interfaces"


interface HotelModalProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	hotel?: IHotel
	dayIndex?: number
}

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	maxHeight: '90vh',
	bgcolor: 'background.paper',
	border: '1px solid #333',
	boxShadow: 24,
	overflow: 'auto',
	padding: 5
}

export const HotelModal: FC<HotelModalProps> = ({ open, setOpen, hotel, dayIndex }) => {
	const [isChecked, setIsChecked] = useState()
	const [loading, setLoading] = useState(false)

	const { textContent, setTextContent, imagesHotel, setImagesHotel } =
		useLoadHotelData(open, hotel as IHotel)

	const { data, setData, onSuccess, onError } = useEditHotelModal({
		hotel: hotel as IHotel,
		textContent: textContent ?? "",
		imagesHotel,
		setOpen,
		dayIndex
	})


	const { validate } = useModalValidation({
		isChecked,
		screenTextContent: hotel ? hotel.textContent : "",
		textContent,
		changedImages: imagesHotel ? imagesHotel?.map(el => el.imageUrl) : [],
		originalImages: hotel ? hotel.imageUrlCaptions.map(el => el.imageUrl) : []
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
		setImagesHotel([])
		setOpen(false)
	}

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 700)
	}, [open])

	if (!hotel || Object.keys(hotel).length === 0) {
		return null
	}

	return (
		<ModalComponent
			open={open}
			setOpen={modalClose}
			styleModal={styleModal}
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
