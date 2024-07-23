import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../context/CountriesContext'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetCountryFilters } from './resetCountryFields'
import { CountryFormFields } from './CountryFormFields'
import { Button } from '@components/atoms'

const CountryMasterForm = () => {
	const { state, dispatch } = useCountry()
	const navigate = useNavigate()
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'countries',
				state.currentCountry,
				state.countries || [],
				dispatch
			)
		} else {
			await createEntity('countries', state.currentCountry, [], dispatch)
		}
		resetCountryFilters(dispatch, {})

		navigate('/app/country')
	}

	return (
		<form onSubmit={handleSubmit}>
			<CountryFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}

export default CountryMasterForm
