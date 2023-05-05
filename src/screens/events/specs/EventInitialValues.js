export const getInitialValues = (event, formData) => {
	if (formData) {
		return formData
	}
	return {
		name: event?.name ?? '',
		city: event?.city ?? '',
		longitude: event?.location?.coordinates[1] ?? '',
		latitude: event?.location?.coordinates[0] ?? '',
		pricePerPerson: event?.pricePerPerson ?? true,
		price: event?.price ?? '',
		textContent: event?.textContent ?? ''
	}
}
