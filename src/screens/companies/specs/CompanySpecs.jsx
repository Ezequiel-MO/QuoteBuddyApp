import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import CompanyMasterForm from './CompanyMasterForm'
import { useFetchClients } from 'src/hooks/fetchData/useFetchClients'

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

export const CompanySpecs = ({
	open = false,
	setOpen = () => {},
	setDataClient = () => {}
}) => {
	const navigate = useNavigate()
	const fileInput = useRef(null)
	const {
		state: { company }
	} = useLocation()
	const { clients } = useFetchClients({ all: 'yes' })
	const [country, setCountry] = useState(company.country || '')

	const update = Object.keys(company).length > 0

	const employeesPath = company.employees?.map((el) => {
		return `${el._id} ${el.firstName} ${el.familyName}`
	})

	const [data, setData] = useState({
		name: company.name || '',
		address: company.address || '',
		postCode: company.postCode || '',
		VATNr: company.VATNr || '',
		colorPalette: company.colorPalette || [],
		fonts: company.fonts?.join(',') || '',
		employees: employeesPath || [],
		country: company.country || ''
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
		formData.append('postCode', data.postCode)
		formData.append('VATNr', data.VATNr)
		if (data.colorPalette.length > 0) {
			for (let i = 0; i < data.colorPalette.length; i++) {
				formData.append('colorPalette', data.colorPalette[i])
			}
		}
		if (!endpoint && files.length > 0) {
			for (let i = 0; i < files?.length; i++) {
				formData.append('imageContentUrl', files[i])
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
		const companyEmployees = []
		for (let i = 0; i < employeesId.length; i++) {
			const response = await baseAPI.get(`clients/${employeesId[i]}`)
			const clientData = response.data.data.data
			companyEmployees.push(clientData)
			companyEmployees[i].clientCompany = data.name
		}

		try {
			if (!update) {
				const companyCreate = await baseAPI.post('client_companies', formData)
				// Modify the "Employee" to have the name of the "ClientCompany"
				const newCompanyEmployees = companyEmployees.map((el) => {
					const { _id, createdAt, updatedAt, ...rest } = el
					return { ...rest }
				})
				for (let i = 0; i < companyEmployees.length; i++) {
					await baseAPI.patch(
						`clients/${companyEmployees[i]._id}`,
						newCompanyEmployees[i]
					)
				}
				toast.success('Company Created', toastOptions)
				// This is for the "ModalCompanyForm.tsx" component
				if (open) {
					const { name } = companyCreate.data.data.data
					setDataClient((prevData) => ({
						...prevData,
						clientCompany: name
					}))
					return setOpen((prevOpen) => !prevOpen)
				}
			}
			if (endpoint === 'client_companies/image') {
				let pathFormData = new FormData()
				const target = event.target
				if (target?.files?.length !== undefined && target.files.length > 0) {
					for (let i = 0; i < target.files.length; i++) {
						pathFormData.append('imageContentUrl', target.files[i])
					}
				}
				const existingImages = pathFormData.getAll('imageUrls')
				if (
					existingImages.length > 1 ||
					files.length > 1 ||
					(existingImages.length > 0 && files.length > 0)
				) {
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
					postCode: formData.get('postCode'),
					VATNr: formData.get('VATNr'),
					colorPalette: formData.getAll('colorPalette'),
					fonts: formData.getAll('fonts'),
					employees: formData.getAll('employees')
				}
				await baseAPI.patch(`client_companies/${company._id}`, dataPath)

				const newCompanyEmployees = companyEmployees.map((el) => {
					const { _id, createdAt, updatedAt, ...rest } = el
					return { ...rest }
				})
				for (let i = 0; i < companyEmployees.length; i++) {
					await baseAPI.patch(
						`clients/${companyEmployees[i]._id}`,
						newCompanyEmployees[i]
					)
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
		<CompanyMasterForm
			clients={clients}
			country={country}
			setCountry={setCountry}
			initialData={data}
			setInitialData={setData}
			fileInput={fileInput}
			submitForm={submitForm}
			companyPath={company}
			validate={validate}
			errors={errors}
			setErrors={setErrors}
		/>
	)
}

export default CompanySpecs
