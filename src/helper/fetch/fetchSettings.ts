import baseAPI from 'src/axios/axiosConfig'

export async function fetchSettings() {
	try {
		const response = await baseAPI.get('settings')
		const settings = response.data.data.data[0]
		localStorage.setItem('settings', JSON.stringify(settings))
		if (settings) {
			document.documentElement.style.setProperty(
				'--color-primary',
				settings.colorPalette?.primary || '#0033A0'
			)
			document.documentElement.style.setProperty(
				'--color-secondary',
				settings.colorPalette?.secundary || '#009E49'
			)
			document.documentElement.style.setProperty(
				'--color-tertiary',
				settings.colorPalette?.tertiary || '#C7BAAE'
			)
		}
		if (settings.fonts && settings.fonts.length > 0) {
			document.documentElement.style.setProperty(
				'--font-family-body',
				settings.fonts.join(', ')
			)
		}

		return settings
	} catch (error: any) {
		console.log('error', error)
		// Check if the error response exists and has a data property
		if (error.response && error.response.data) {
			// Extract the error message from the response
			const errorMessage = error.response.data.message
			console.log('Error fetching settings:', errorMessage)
			// Optionally, display the error message to the user
			alert(`Error fetching settings: ${errorMessage}`)
		} else {
			console.log('Error fetching settings:', error.message)
		}

		return null
	}
}
