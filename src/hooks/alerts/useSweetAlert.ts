// hooks/useSweetAlert.ts
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

export const useSweetAlert = () => {
	const mySwal = withReactContent(Swal)

	const showAlert = async (
		config: SweetAlertOptions
	): Promise<SweetAlertResult> => {
		return await mySwal.fire(config)
	}

	return { showAlert }
}
