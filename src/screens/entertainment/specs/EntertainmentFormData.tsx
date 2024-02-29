import { IEntertainment } from 'src/interfaces/entertainment'

export const EntertainmentFormData = {
	create: (values: IEntertainment, files: File[]) => {
		const formData = new FormData()
		formData.append('vendor', values.vendor)
		formData.append('city', values.city)
		formData.append('name', values.name)
		formData.append('contact', values.contact)
		formData.append('email', values.email)
		formData.append('category', values.category)
		formData.append('duration', values.duration)
		formData.append('nrArtists', values.nrArtists || '')
		formData.append('textContent', values.textContent || '')
		if (values.availableLanguages.length > 0) {
			for (let i = 0; i < values.availableLanguages.length; i++) {
				formData.append("availableLanguages", values.availableLanguages[i])
			}
		}
		const descriptionsMap = new Map(Object.entries(values.descriptions))
		for (let i in values.descriptions) {
			formData.append(`descriptions[${i}]`, descriptionsMap.get(i))
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
	update: (values: IEntertainment) => {
		const jsonData = {} as IEntertainment
		jsonData.vendor = values.vendor
		jsonData.city = values.city
		jsonData.name = values.name
		jsonData.contact = values.contact
		jsonData.email = values.email
		jsonData.category = values.category
		jsonData.duration = values.duration
		jsonData.nrArtists = values.nrArtists
		jsonData.textContent = values.textContent
		jsonData.availableLanguages = values.availableLanguages
		jsonData.descriptions = values.descriptions
		if (values.textContent && !jsonData.availableLanguages.includes("en")) {
			jsonData.availableLanguages.push("en")
		}
		return jsonData
	},
	updateImageData: (values: IEntertainment, files: File[]) => {
		let formData = new FormData()

		if (values.imageContentUrl && values.imageContentUrl.length > 0) {
			formData.append('imageUrls', values.imageContentUrl as any)
		}
		if (values.deletedImage && values.deletedImage.length > 0) {
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
