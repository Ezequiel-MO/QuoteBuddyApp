export const RestaurantFormData = {
	create: (values, files) => {
		const formData = new FormData()
		formData.append('name', values.name)
		formData.append('city', values.city)
		formData.append('textContent', values.textContent)
		formData.append('price', values.price)
		formData.append('location[coordinates][0]', values.latitude)
		formData.append('location[coordinates][1]', values.longitude)
		formData.append('isVenue', values.isVenue)
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
		jsonData.textContent = values.textContent
		jsonData.price = values.price
		jsonData.location = {
			type: 'Point',
			coordinates: [values.latitude, values.longitude]
		}
		jsonData.isVenue = values.isVenue

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
