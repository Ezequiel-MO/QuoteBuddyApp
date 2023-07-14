export const LocationFormData = {
	create: (values, files) => {
		let formData = new FormData()
		formData.append('name', values.name)
		formData.append('textContent', values.textContent)
		formData.append('location[coordinates][0]', values.latitude)
		formData.append('location[coordinates][1]', values.longitude)
		formData.append('country', values.country)
		if (values.inFigures.length > 0) {
			formData.append('inFigures', values.inFigures)
		}
		if (values.corporateFacts.length > 0) {
			formData.append('corporateFacts', values.corporateFacts)
		}
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
		jsonData.textContent = values.textContent
		jsonData.location = {
			type: 'Point',
			coordinates: [values.latitude, values.longitude]
		}
		jsonData.country = values.country
		jsonData.inFigures = values.inFigures
		jsonData.corporateFacts = values.corporateFacts

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
