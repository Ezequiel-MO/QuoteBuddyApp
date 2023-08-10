import { useCallback } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useSweetAlertConfirmationDialog = ({ onSuccess, onError }) => {
	const mySwal = withReactContent(Swal)

	const handleConfirm = useCallback(async () => {
		const result = await mySwal.fire({
			title: 'Do you want to modify the data?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'yes',
			cancelButtonText: `Cancel`,
			customClass: { container: 'custom-container' }
		})

		if (result.isConfirmed) {
			try {
				await onSuccess()
				await mySwal.fire({
					title: 'Success',
					icon: 'success',
					confirmButtonText: 'continue',
					customClass: { container: 'custom-container' }
				})
			} catch (error) {
				console.log(error)
				onError(error)
			}
		}
	}, [mySwal, onSuccess, onError])

	return { handleConfirm }
}
