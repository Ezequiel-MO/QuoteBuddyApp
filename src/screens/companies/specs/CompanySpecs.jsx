import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { useGetClients } from '../../../hooks'
import CompanyMasterForm from './CompanyMasterForm'

const validate = (input) => {
	const errors = {}
	if (!input.name) {
		errors.name = 'required name'
	}
	if (!input.address) {
		errors.address = 'required address'
	}
	return errors
}

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
	const [errors, setErrors] = useState({})

	const toastErrorMsg = 'Error Creating/Updating Company, complete the form'

	

	const submitForm = async (event, files, endpoint) => {
		!endpoint && event.preventDefault()
		if (Object.values(errors).length > 0) {
			return toast.error(toastErrorMsg, errorToastOptions)
		}
		let formData = new FormData()
		formData.append('name', data.name)
		formData.append('country', country)
		formData.append('address', data.address)
		if (data.colorPalette.length > 0) {
			for (let i = 0; i < data.colorPalette.length; i++) {
				formData.append('colorPalette', data.colorPalette[i])
			}
		}
		if (!endpoint && files.files.length > 0) {
			for (let i = 0; i < files.files?.length; i++) {
				formData.append('imageContentUrl', files.files[i])
			}
		}
		if (data.fonts.length > 0) {
			const fonts = data.fonts.split(',').filter((el) => el !== ' ')
			for (let i = 0; i < fonts.length; i++) {
				formData.append('fonts', fonts[i])
			}
		}
		const employeesId = []
		if (data.employees.length > 0) {
			let employees = data.employees
				.join(' ')
				.split(' ')
				.filter((el) => el.length > 15)
			for (let i = 0; i < employees.length; i++) {
				formData.append('employees', employees[i])
				employeesId.push(employees[i])
			}
		}
		//El name que tenga "ClientCompany" lo va a tener en el/los "Employee"  seleccionado/s
		const companyEmployees = []
		for (let i = 0; i < employeesId.length; i++) {
			companyEmployees.push((await baseAPI.get(`clients/${employeesId[i]}`)).data.data.data)
			companyEmployees[i].clientCompany = data.name
		}

		try {
			if (!update) {
				await baseAPI.post('client_companies', formData)
				//modifico el/los "Employee" para que tenga name del "ClientCompany"
				const newCompanyEmployees = companyEmployees.map(el => {
					const {
						_id,
						createdAt,
						updatedAt,
						...rest } = el
					return { ...rest }
				})
				for (let i = 0; i < companyEmployees.length; i++) {
					await baseAPI.patch(`clients/${companyEmployees[i]._id}`, newCompanyEmployees[i])
				}
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
					`client_companies/images/${company._id}`,
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
				await baseAPI.patch(`client_companies/${company._id}`, dataPath)
				//modifico el/los "Employee" para que tenga name del "ClientCompany"
				const newCompanyEmployees = companyEmployees.map(el => {
					const {
						_id,
						createdAt,
						updatedAt,
						...rest } = el
					return { ...rest }
				})
				for (let i = 0; i < companyEmployees.length; i++) {
					await baseAPI.patch(`clients/${companyEmployees[i]._id}`, newCompanyEmployees[i])
				}
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
				validate={validate}
				errors={errors}
				setErrors={setErrors}
			/>
		</>
	)
}

export default CompanySpecs
