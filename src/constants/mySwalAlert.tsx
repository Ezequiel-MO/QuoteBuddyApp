// alertConfig.ts
import { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2'

// Define the correct type for the icon
const icon: SweetAlertIcon = 'warning'

export const DELETE_HOTEL_ALERT_CONFIG: SweetAlertOptions = {
	title: 'Do you want to delete the Hotel?',
	html: '<p style="color: red;">The meetings that were created with this Hotel will also be deleted!</p>',
	icon, // Use the correctly typed icon
	showCancelButton: true,
	confirmButtonText: 'Yes',
	cancelButtonText: 'Cancel',
	customClass: { container: 'custom-container' }
}
