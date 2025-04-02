export const toastOptions = {
	position: 'top-right' as const,
	autoClose: 750,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true
	// progress: undefined
}

export const errorToastOptions = {
	position: 'top-right' as const,
	autoClose: 2000,
	hideProgressBar: true,
	closeOnClick: true,
	draggable: true
}
