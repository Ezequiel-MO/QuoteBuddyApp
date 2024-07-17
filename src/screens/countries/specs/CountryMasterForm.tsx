import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../context/CountriesContext'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetCountryFilters } from './resetCountryFields'
import { CountryFormFields } from './CountryFormFields'

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
				<button
					type="submit"
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
			</div>
		</form>
	)
}

export default CountryMasterForm
