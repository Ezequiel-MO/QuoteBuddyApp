import { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetClients } from '../../../hooks'
import CompanyMasterForm from './CompanyMasterForm'
import { useSubmitForm } from './useSubmitForm'

const validate = (input) => {
	const errors = {}
	if (!input.name) {
		errors.name = 'required name'
	}
	if (!input.address) {
		errors.address = 'required addres'
	}
	return errors
}

const CompanySpecs = () => {
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

	const [submitForm, errors, setErrors] = useSubmitForm({ update, company })

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
