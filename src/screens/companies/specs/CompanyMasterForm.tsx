import React from 'react'
import { CompanyFormFields } from './CompanyFormFields'
import { useCompany } from '../context/CompanyContext'
import { useNavigate } from 'react-router-dom'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetCompanyFilters } from './resetCompanyFilters'

const CompanyMasterForm = () => {
	const { state, dispatch } = useCompany()
	const navigate = useNavigate()
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'companies',
				state.currentCompany,
				state.companies || [],
				dispatch,
				'client_companies'
			)
		} else {
			await createEntity('companies', state.currentCompany, [], dispatch)
		}
		resetCompanyFilters(dispatch, {
			country: ''
		})
		navigate('/app/marketing/company')
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<CompanyFormFields />
				<div className="flex justify-center m-6">
					<button
						type="submit"
						className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Submit
					</button>
				</div>
			</form>
		</>
	)
}

export default CompanyMasterForm
