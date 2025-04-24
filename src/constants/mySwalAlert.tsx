// alertConfig.ts
import { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)

// Define the correct type for the icon
const icon: SweetAlertIcon = 'warning'

// Base configuration
export const swalTheme = {
	color: '#f1f5f9', // text-slate-100
	background: '#111827', // bg-gray-900
	confirmButtonColor: '#2563eb', // blue-600
	cancelButtonColor: '#dc2626', // red-600
	dangerButtonColor: '#b91c1c', // red-700
	successButtonColor: '#16a34a', // green-600
	popup: 'rounded-lg border border-gray-700 shadow-lg',
	title: 'text-xl font-semibold text-slate-100',
	htmlContainer: 'text-slate-200',
	input:
		'bg-gray-800 border border-gray-700 text-slate-100 rounded p-2 mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
}

// Alert types
export const confirmAlert = (title: string, text = '') =>
	mySwal.mixin({
		title,
		text,
		icon: 'warning',
		iconColor: '#ea5933',
		showClass: {
			popup: 'animate__animated animate__fadeInUp animate__faster'
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOutDown animate__faster'
		},
		showCancelButton: true,
		confirmButtonText: 'Yes',
		cancelButtonText: 'Cancel',
		customClass: {
			container: 'custom-container',
			popup: `${swalTheme.popup} shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800`,
			title: `${swalTheme.title} mb-4 text-2xl gradient-text`,
			htmlContainer: `${swalTheme.htmlContainer} mb-5`,
			input: swalTheme.input,
			confirmButton:
				'swal2-confirm bg-gradient-to-r from-cyan-700 to-[#ea5933] text-white-0 font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mr-3',
			cancelButton:
				'swal2-cancel bg-gray-700 hover:bg-gray-600 text-white-0 font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200',
			actions: 'flex justify-center gap-4 mt-4'
		},
		buttonsStyling: false,
		focusConfirm: false,
		timerProgressBar: true,
		allowOutsideClick: () => !Swal.isLoading()
	})

// Add this style to your CSS or add it inline in your component
document.head.insertAdjacentHTML(
	'beforeend',
	`
	<style>
		.gradient-text {
			background: linear-gradient(to right, #4facfe, #ea5933);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.pulse-animation {
			animation: pulse 1.5s infinite;
		}
		@keyframes pulse {
			0% {
				transform: scale(0.95);
				box-shadow: 0 0 0 0 rgba(234, 89, 51, 0.7);
			}
			70% {
				transform: scale(1);
				box-shadow: 0 0 0 10px rgba(234, 89, 51, 0);
			}
			100% {
				transform: scale(0.95);
				box-shadow: 0 0 0 0 rgba(234, 89, 51, 0);
			}
		}

		.swal2-confirm, .swal2-cancel {
			position: relative;
			overflow: hidden;
		}
		
		.swal2-confirm:after, .swal2-cancel:after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 5px;
			height: 5px;
			background: rgba(255, 255, 255, 0.5);
			opacity: 0;
			border-radius: 100%;
			transform: scale(1, 1) translate(-50%);
			transform-origin: 50% 50%;
		}
		
		.swal2-confirm:focus:not(:active)::after, .swal2-cancel:focus:not(:active)::after {
			animation: ripple 1s ease-out;
		}
		
		@keyframes ripple {
			0% {
				transform: scale(0, 0);
				opacity: 0.5;
			}
			20% {
				transform: scale(25, 25);
				opacity: 0.5;
			}
			100% {
				opacity: 0;
				transform: scale(40, 40);
			}
		}
	</style>
	`
)

export const promptAlert = (title: string, inputValue = '') =>
	mySwal.mixin({
		title,
		input: 'text',
		inputValue,
		inputPlaceholder: 'Enter your text...',
		showCancelButton: true,
		customClass: {
			container: 'custom-container',
			popup: swalTheme.popup,
			title: swalTheme.title,
			input: swalTheme.input
		},
		buttonsStyling: false,
		confirmButtonColor: swalTheme.confirmButtonColor,
		cancelButtonColor: swalTheme.cancelButtonColor
	})

export const errorAlert = (title = 'Error', text = '') =>
	mySwal.mixin({
		title,
		text,
		icon: 'error',
		customClass: {
			container: 'custom-container',
			popup: swalTheme.popup,
			// title: swalTheme.title
		},
		confirmButtonColor: swalTheme.confirmButtonColor
	})

export const successAlert = (title = 'Success', text = '') =>
	mySwal.mixin({
		title,
		text,
		icon: 'success',
		customClass: {
			container: 'custom-container',
			popup: swalTheme.popup,
			title: swalTheme.title
		},
		confirmButtonColor: swalTheme.confirmButtonColor
	})

// Common alert configurations
export const deleteAlertConfig = {
	title: 'Delete Note',
	text: 'Are you sure you want to delete this note?',
	icon: 'warning' as const
}

export const editAlertConfig = (entityName: string) => ({
	title: `Edit note for ${entityName}`,
	inputAttributes: {
		maxlength: '120'
	}
})

export const DELETE_HOTEL_ALERT_CONFIG: SweetAlertOptions = {
	title: 'Do you want to delete the Hotel?',
	html: '<p style="color: red;">The meetings that were created with this Hotel will also be deleted!</p>',
	icon, // Use the correctly typed icon
	showCancelButton: true,
	confirmButtonText: 'Yes',
	cancelButtonText: 'Cancel',
	customClass: { container: 'custom-container' }
}
