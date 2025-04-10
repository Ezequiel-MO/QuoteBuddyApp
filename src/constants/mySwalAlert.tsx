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
		showCancelButton: true,
		confirmButtonText: 'Yes',
		cancelButtonText: 'Cancel',
		customClass: {
			container: 'custom-container',
			popup: swalTheme.popup,
			title: swalTheme.title,
			htmlContainer: swalTheme.htmlContainer,
			input: swalTheme.input
		},
		buttonsStyling: false,
		confirmButtonColor: swalTheme.confirmButtonColor,
		cancelButtonColor: swalTheme.cancelButtonColor
	})

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
			title: swalTheme.title
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
