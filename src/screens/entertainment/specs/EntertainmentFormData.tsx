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
