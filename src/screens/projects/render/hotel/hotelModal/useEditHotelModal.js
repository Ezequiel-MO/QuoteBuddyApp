import { useState } from 'react'
import { useCurrentProject } from '../../../../../hooks'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../helper/toast'

export const useEditHotelModal = ({
	hotel,
	textContent,
	imagesHotel,
	setOpen,
	dayIndex
}) => {
	const { editModalHotel , editModalHotelOvernight } = useCurrentProject()
	const [data, setData] = useState({})

	const onSuccess = async () => {
		editModalHotel({
			pricesEdit: data,
			id: hotel._id,
			textContentEdit: textContent,
			imageContentUrlEdit: imagesHotel
		})
		if(dayIndex !== undefined){
			editModalHotelOvernight({
				pricesEdit:data,
				id:hotel._id,
				textContentEdit: textContent,
				imageContentUrlEdit: imagesHotel,
				dayIndex
			})
		}
		setTimeout(() => {
			setOpen(false)
		}, 1000)
	}

	const onError = (error) => toast.error(error, errorToastOptions)

	return { data, setData, onSuccess, onError }
}
