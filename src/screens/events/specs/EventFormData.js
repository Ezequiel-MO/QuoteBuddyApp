export const EventFormData = {
	create: (values, files) => {
		let formData = new FormData()
		formData.append('name', values.name)
		formData.append('city', values.city)
		formData.append('textContent', values.textContent)
		formData.append('pricePerPerson', values.pricePerPerson === '' && 'true')
		formData.append('coordsActive', values.coordsActive === '' && 'true')
		formData.append('regular', values.regular ? values.regular : false)
		formData.append('price', values.price)
		formData.append('location[coordinates][0]', values.latitude)
		formData.append('location[coordinates][1]', values.longitude)
		if (values.availableLanguages.length > 0) {
			for (let i = 0; i < values.availableLanguages.length; i++) {
				formData.append("availableLanguages", values.availableLanguages[i])
			}
		}
		for (let i in values.descriptions) {
			formData.append(`descriptions[${i}]`, values.descriptions[i])
		}
		if (values.textContent && !values.availableLanguages.includes("en")) {
			formData.append("availableLanguages", "en")
		}
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('imageContentUrl', files[i])
			}
		}
		return formData
	},
	update: (values) => {
		let jsonData = {}
		jsonData.name = values.name
		jsonData.city = values.city
		jsonData.pricePerPerson = values.pricePerPerson
		jsonData.coordsActive = values.coordsActive
		jsonData.price = values.price
		jsonData.regular = values.regular ? values.regular : false
		jsonData.textContent = values.textContent
		jsonData.availableLanguages = values.availableLanguages
		jsonData.descriptions = values.descriptions
		if (values.textContent && !jsonData.availableLanguages.includes("en")) {
			jsonData.availableLanguages.push("en")
		}
		jsonData.location = {
			type: 'Point',
			coordinates: [values.latitude, values.longitude]
		}
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
