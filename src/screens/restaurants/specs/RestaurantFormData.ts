import { IRestaurant } from 'src/interfaces'

interface IRestaurantValues extends IRestaurant {
	longitude: number
	latitude: number
	deletedImage?: string[]
	isVenueValue?: string
}

export const RestaurantFormData = {
	create: (values: any, files: File[]): FormData => {
		// const formData = new FormData()
		// if (values.name) formData.append('name', values.name)
		// if (values.city) formData.append('city', values.city)
		// if (values.textContent) formData.append('textContent', values.textContent)
		// if (values.price) formData.append('price', values.price.toString())
		// if (values.location && values.location.coordinates) {
		// 	formData.append(
		// 		'location[coordinates][0]',
		// 		values.location.coordinates[0].toString()
		// 	)
		// 	formData.append(
		// 		'location[coordinates][1]',
		// 		values.location.coordinates[1].toString()
		// 	)
		// }
		// formData.append(
		// 	'isVenue',
		// 	values.isVenue === undefined ? 'false' : values.isVenue.toString()
		// )
		// formData.append('isVenue', values.isVenueValue === "true" ? "true" : "false")
		// if (files.length > 0) {
		// 	for (let i = 0; i < files.length; i++) {
		// 		if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
		// 			formData.append('imageContentUrl', files[i])
		// 		} else {
		// 			formData.append("pdfMenus", files[i])
		// 		}
		// 	}
		// }
		// return formData
		//ESTA FORMA ES TEMPORAL
		const formData = new FormData()
		formData.append('name', values.name)
		formData.append('city', values.city)
		formData.append('textContent', values.textContent)
		formData.append('price', values.price)
		formData.append('location[coordinates][0]', values.latitude)
		formData.append('location[coordinates][1]', values.longitude)
		formData.append('isVenue', values.isVenue === "true" ? "true" : "false")
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
					formData.append('imageContentUrl', files[i])
				}
				if (files[i].type === "application/pdf"){
					formData.append("pdfMenus", files[i])
				}
			}
		}
		return formData
	},

	update: (values: IRestaurantValues) => {
		const jsonData = {} as IRestaurant
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

	updateImageData: (values: IRestaurantValues, files: File[]) => {
		let formData = new FormData()

		if (values.imageContentUrl && values.imageContentUrl.length > 0) {
			formData.append('imageUrls', values.imageContentUrl.join(','))
		}
		if (values.deletedImage && values.deletedImage.length > 0) {
			formData.append('deletedImage', values.deletedImage.join(','))
		}
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('imageContentUrl', files[i])
			}
		}
		return formData
	},

	updatePdfData: (values: IRestaurantValues, files: File[]) => {
		let formData = new FormData()
		formData.append("typeImage", "pdfMenus")
		if (values.imageContentUrl && values.imageContentUrl.length > 0) {
			formData.append('imageUrls', values.imageContentUrl.join(','))
		}
		if (values.deletedImage && values.deletedImage.length > 0) {
			formData.append('deletedImage', values.deletedImage.join(','))
		}
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('pdfMenus', files[i])
			}
		}
		return formData
	}
}
