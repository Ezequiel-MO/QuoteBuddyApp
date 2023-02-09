import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { useGetClients } from '../../../hooks'
import CompanyMasterForm from './CompanyMasterForm'

const CompanySpecs = () => {
	const navigate = useNavigate()
	const fileInput = useRef()
	const {
		state: { company }
	} = useLocation()
	const { clients } = useGetClients({ all: 'yes' })
	const [country, setCountry] = useState(company.country || '')

	const update = Object.keys(company).length > 0 ? true : false

	const employeesPath =
		company.employees &&
		company.employees.map((el) => {
			return `${el._id} ${el.firstName} ${el.familyName}`
		})

	const [data, setData] = useState({
		name: company.name || '',
		address: company.address || '',
		colorPalette: company.colorPalette || [],
		fonts: company.fonts?.join(',') || '',
		employees: employeesPath || []
	})

	const submitForm = async (event, files, endpoint) => {
		!endpoint && event.preventDefault()
		let formData = new FormData()
		formData.append('name', data.name)
		formData.append('country', country)
		formData.append('address', data.address)
		if (data.colorPalette.length > 0) {
			for (let i = 0; i < data.colorPalette.length; i++) {
				formData.append('colorPalette', data.colorPalette[i])
			}
		}
		if (!endpoint) {
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
			}
			if (endpoint === 'client_companies/image') {
				let pathFormData = new FormData()
				if (event?.imageContentUrl.length > 0) {
					pathFormData.append('imageUrls', event.imageContentUrl)
				}
				if (event?.deletedImage?.length > 0) {
					pathFormData.append('deletedImage', event.deletedImage)
				}
				if (files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						console.log(files[i])
						formData.append('imageContentUrl', files[i])
					}
				}
				await baseAPI.patch(
					`v1/client_companies/images/${company._id}`,
					pathFormData
				)
			}
			if (update) {
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

	return (
		<>
			<CompanyMasterForm
				clients={clients}
				country={country}
				setCountry={setCountry}
				data={data}
				setData={setData}
				fileInput={fileInput}
				handleSubmit={submitForm}
				companyPath={company}
			/>
		</>
	)
}

export default CompanySpecs
