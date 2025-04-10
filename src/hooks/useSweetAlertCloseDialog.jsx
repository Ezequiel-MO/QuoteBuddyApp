import { useCallback } from 'react'
import { confirmAlert } from '../constants/mySwalAlert'

export const useSweetAlertCloseDialog = ({ setOpen, validate }) => {
	const handleClose = useCallback(async () => {
		if (validate()) {
			const result = await confirmAlert(
				'There is modified data',
				'Are you sure you want to exit? Your data will be lost'
			).fire()

			if (result.isConfirmed) {
				setOpen(false)
			}
		} else {
			setOpen(false)
		}
	}, [setOpen, validate])

	return { handleClose }
}
