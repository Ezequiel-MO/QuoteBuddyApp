import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'

export const useSubmitForm = ({ update, company }) => {
	const navigate = useNavigate()
	const toastErrorMsg = 'Error Creating/Updating Company, complete the form'
	const [errors, setErrors] = useState({})

	const submitForm = async (event, files, endpoint, data) => {
		event.preventDefault()
		if (Object.values(errors).length > 0) {
			return toast.error(toastErrorMsg, errorToastOptions)
		}
		let formData = new FormData()
		formData.append('name', data.name)
		formData.append('country', data.country)
		formData.append('address', data.address)
		if (data.colorPalette.length > 0) {
			for (let i = 0; i < data.colorPalette.length; i++) {
				formData.append('colorPalette', data.colorPalette[i])
			}
		}
		if (files.length > 0) {
			for (let i = 0; i < files.files.length; i++) {
				formData.append('imageContentUrl', files.files[i])
			}
		}
		if (data.fonts.length > 0) {
			const fonts = data.fonts.split(',').filter((el) => el !== ' ')
			for (let i = 0; i < fonts.length; i++) {
				formData.append('fonts', fonts[i])
			}
		}
		if (data.employees.length > 0) {
			let employees = data.employees
				.join(' ')
				.split(' ')
				.filter((el) => el.length > 15)
			for (let i = 0; i < employees.length; i++) {
				formData.append('employees', employees[i])
			}
		}
		try {
			if (!update) {
				await baseAPI.post('v1/client_companies', formData)
				toast.success('Company Created', toastOptions)
			} else if (endpoint === 'client_companies/image') {
				let pathFormData = new FormData()
				if (event?.imageContentUrl.length > 0) {
					pathFormData.append('imageUrls', event.imageContentUrl)
				}
				if (event?.deletedImage?.length > 0) {
					pathFormData.append('deletedImage', event.deletedImage)
				}
				if (files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						pathFormData.append('imageContentUrl', files[i])
					}
				}
				const existingImages = company.imageContentUrl
				if (existingImages.length > 0) {
					return toast.error(
						`Please delete existing images before uploading new ones`,
						errorToastOptions
					)
				}
				await baseAPI.patch(
					`v1/client_companies/images/${company._id}`,
					pathFormData
				)
			} else {
				const dataPath = {
					name: formData.get('name'),
					address: formData.get('address'),
					country: formData.get('country'),
					colorPalette: formData.getAll('colorPalette'),
					fonts: formData.getAll('fonts'),
					employees: formData.getAll('employees')
				}
				await baseAPI.patch(`v1/client_companies/${company._id}`, dataPath)
				toast.success('Company Updated', toastOptions)
			}
			setTimeout(() => {
				navigate('/app/company')
			}, 1000)
		} catch (err) {
			toast.error(
				`Error Creating/Updating Company, ${err.response.data.message}`,
				errorToastOptions
			)
		}
	}

	return [submitForm, errors, setErrors]
}
