import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { useGetClients } from '../../../hooks'
import CompanyMasterForm from './CompanyMasterForm'

const CompanySpecs = () => {
	const navigate = useNavigate()
	const fileInput = useRef()
	const { clients } = useGetClients({ all: 'yes' })
	const [country, setCountry] = useState('')

	const [data, setData] = useState({
		name: '',
		address: '',
		employes: [],
		colorPalette: [],
		fonts: '',
		employees: []
	})

	const submitForm = async (event, files) => {
		event.preventDefault()
		let formData = new FormData()
		formData.append('name', data.name)
		formData.append('country', country)
		formData.append('address', data.address)
		if (data.colorPalette.length > 0) {
			for (let i = 0; i < data.colorPalette.length; i++) {
				formData.append('colorPalette', data.colorPalette[i])
			}
		}
		for (let i = 0; i < files.files.length; i++) {
			formData.append('imageContentUrl', files.files[i])
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
			await baseAPI.post('v1/client_companies', formData)
			toast.success('Company Created', toastOptions)
			setTimeout(() => {
				navigate('/app/project')
			}, 1000)
		} catch (err) {
			toast.error(
				`Error Creating/Updating Company, ${err.response.data.msg}`,
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
			/>
		</>
	)
}

export default CompanySpecs
