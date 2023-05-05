export const getInitialValues = (restaurant, formData) => {
	if (formData) {
		return formData
	}
	return {
		name: restaurant?.name ?? '',
		city: restaurant?.city ?? '',
		longitude: restaurant?.location?.coordinates[1] ?? '',
		latitude: restaurant?.location?.coordinates[0] ?? '',
		price: restaurant?.price ?? '',
		textContent: restaurant?.textContent ?? '',
		isVenue: restaurant?.isVenue ?? false
	}
}
