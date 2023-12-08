import React, { useState } from 'react'
import { useCurrentProject } from '../../../../../hooks'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../helper/toast'
import { IHotel } from "src/interfaces"

interface UseEditHotelModalProps {
	hotel: IHotel
	textContent: string
	imagesHotel: string[]
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	dayIndex?: number
}

export const useEditHotelModal = ({
	hotel,
	textContent,
	imagesHotel,
	setOpen,
	dayIndex
}: UseEditHotelModalProps) => {
	const { editModalHotel, editModalHotelOvernight } = useCurrentProject()
	const [data, setData] = useState({})

	const onSuccess = async () => {
		editModalHotel({
			pricesEdit: data,
			id: hotel._id,
			textContentEdit: textContent,
			imageContentUrlEdit: imagesHotel
		})
		if (dayIndex !== undefined) {
			editModalHotelOvernight({
				pricesEdit: data,
				id: hotel._id,
				textContentEdit: textContent,
				imageContentUrlEdit: imagesHotel,
				dayIndex
			})
		}
		setTimeout(() => {
			setOpen(false)
		}, 1000)
	}

	const onError = (error: any) => toast.error(error.message, errorToastOptions)

	return { data, setData, onSuccess, onError }
}
