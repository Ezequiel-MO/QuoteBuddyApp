export const AccManagerFormData = {
	create: (values, files) => {
		const formData = new FormData()
		formData.append('firstName', values.firstName)
		formData.append('familyName', values.familyName)
		formData.append('email', values.email)
		if (files.length > 0) {
			formData.append('imageContentUrl', files[0])
		}
		return formData
	},
	update: (values) => {
		const jsonData = {}
		jsonData.firstName = values.firstName
		jsonData.familyName = values.familyName
		jsonData.email = values.email
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
