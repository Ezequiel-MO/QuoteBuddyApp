export const getInitialValues = (hotel, formData) => {
	if (formData) {
		return formData
	}
	return {
		name: hotel?.name ?? '',
		city: hotel?.city ?? '',
		address: hotel?.address ?? '',
		numberStars: hotel?.numberStars ?? '',
		numberRooms: hotel?.numberRooms ?? '',
		checkin_out: hotel?.checkin_out ?? '',
		meetingRooms: hotel?.meetingRooms ?? '',
		wheelChairAccessible: hotel?.wheelChairAccessible ?? true,
		wifiSpeed: hotel?.wifiSpeed ?? '',
		swimmingPool: hotel?.swimmingPool ?? '',
		restaurants: hotel?.restaurants ?? '',
		longitude: hotel?.location?.coordinates[1] ?? '',
		latitude: hotel?.location?.coordinates[0] ?? '',
		textContent: hotel?.textContent ?? ''
	}
}
