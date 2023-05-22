import { useCallback } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useSweetAlertCloseDialog = ({ setOpen, validate }) => {
	const mySwal = withReactContent(Swal)

	const handleClose = useCallback(() => {
		if (validate()) {
			mySwal
				.fire({
					title: 'There is modified data',
					text: 'Are you sure you want to exit? Your data will be lost',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'yes',
					cancelButtonText: `Cancel`,
					customClass: { container: 'custom-container' }
				})
				.then((res) => {
					if (res.isConfirmed) {
						setOpen(false)
					}
				})
		} else {
			setOpen(false)
		}
	}, [setOpen, validate, mySwal])

	return { handleClose }
}
