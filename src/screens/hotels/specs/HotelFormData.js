export const HotelFormData = {
	create: (values, files) => {
		const formData = new FormData()
		formData.append('name', values.name)
		formData.append('city', values.city)
		formData.append('address', values.address)
		formData.append('numberStars', values.numberStars)
		formData.append('numberRooms', values.numberRooms)
		formData.append('checkin_out', values.checkin_out)
		formData.append('wheelChairAccessible', values.wheelChairAccessible === "" && false)
		formData.append('wifiSpeed', values.wifiSpeed)
		formData.append('swimmingPool', values.swimmingPool)
		formData.append('restaurants', values.restaurants)
		formData.append('textContent', values.textContent)
		formData.append('meetingRooms', values.meetingRooms)
		formData.append('location[coordinates][0]', values.latitude)
		formData.append('location[coordinates][1]', values.longitude)
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('imageContentUrl', files[i])
			}
		}
		return formData
	},
	update: (values) => {
		const jsonData = {}
		jsonData.name = values.name
		jsonData.city = values.city
		jsonData.address = values.address
		jsonData.numberStars = values.numberStars
		jsonData.numberRooms = values.numberRooms
		jsonData.meetingRooms = values.meetingRooms
		jsonData.checkin_out = values.checkin_out
		jsonData.wheelChairAccessible = values.wheelChairAccessible
		jsonData.wifiSpeed = values.wifiSpeed
		jsonData.swimmingPool = values.swimmingPool
		jsonData.restaurants = values.restaurants
		jsonData.textContent = values.textContent
		jsonData.location = {
			type: 'Point',
			coordinates: [values.latitude, values.longitude]
		}
		const formData = new FormData()
		formData.append('textContent', values.textContent)
		return jsonData
	},

	updateImageData: (values, files) => {
		let formData = new FormData()
		if (values?.imageContentUrl.length > 0) {
			formData.append('imageUrls', values.imageContentUrl)
		}
		if (values?.deletedImage?.length > 0) {
			formData.append('deletedImage', values.deletedImage)
		}
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('imageContentUrl', files[i])
			}
		}
		return formData
	}
}
