import React from 'react'
import { CompanyFormFields } from './CompanyFormFields'
import { useCompany } from '../context/CompanyContext'
import { useNavigate } from 'react-router-dom'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetCompanyFilters } from './resetCompanyFilters'
import { Button } from '@components/atoms'

const CompanyMasterForm = () => {
	const { state, dispatch } = useCompany()

	const navigate = useNavigate()
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
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
			await createEntity('companies', state.currentCompany, [], dispatch, 'client_companies')
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
					<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
						{state.update ? 'Edit & Exit' : 'Submit'}
					</Button>
				</div>
			</form>
		</>
	)
}

export default CompanyMasterForm
