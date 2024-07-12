import { TextInput } from '@components/atoms'
import { useClient } from '../context/ClientContext'
import { AddCompanyToClientForm } from './AddCompanyToClientForm'
import { CountrySelector } from '../../../components/atoms/filters/CountrySelector'
import { useApiFetch } from 'src/hooks/fetchData'
import { ICountry } from '@interfaces/country'
import { ClientOrigin } from './ClientOrigin'
import { IClient } from '@interfaces/client'
import initialState from '../context/initialState'
import { ClientQualification } from './ClientQualification'
import { ClientLanguageSelector } from './ClientLanguageSelector'
import { quoteLanguage } from 'src/constants'
import { ClientNotes } from './ClientNotes'

export const ClientFormFields = () => {
	const { state, handleChange, handleBlur, errors } = useClient()
	const { data: countries } = useApiFetch<ICountry[]>('countries')

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					Client Details
				</h1>
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<TextInput
					label="First Name"
					placeholder="name of the client"
					type="text"
					name="firstName"
					value={state.currentClient?.firstName}
					handleChange={handleChange}
					errors={errors.firstName}
					handleBlur={handleBlur}
				/>
				<TextInput
					label="Family Name"
					placeholder="last name of the client"
					type="text"
					name="familyName"
					value={state.currentClient?.familyName}
					handleChange={handleChange}
					errors={errors.familyName}
					handleBlur={handleBlur}
				/>
				<TextInput
					label="Email"
					placeholder="Client email"
					type="email"
					name="email"
					value={state.currentClient?.email}
					handleChange={handleChange}
					errors={errors.email}
					handleBlur={handleBlur}
				/>
				<TextInput
					label="Phone number"
					placeholder="Client phone number"
					type="tel"
					name="phone"
					value={state.currentClient?.phone}
					handleChange={handleChange}
					errors={errors.phone}
					handleBlur={handleBlur}
				/>
				<ClientLanguageSelector
					quoteLanguage={state.currentClient?.quoteLanguage as string}
					options={quoteLanguage}
					errors={errors}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
				<CountrySelector
					country={state.currentClient?.country as string}
					options={countries}
					errors={errors}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
			</div>
			<div>
				<ClientOrigin
					currentClient={
						state.currentClient || (initialState.currentClient as IClient)
					}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
			</div>
			<div>
				<ClientQualification
					currentClient={
						state.currentClient || (initialState.currentClient as IClient)
					}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
			</div>
			<div className="w-full">
				{state.renderAddCompanyInForm && (
					<AddCompanyToClientForm
						currentCompany={state.currentClient?.clientCompany || ''}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
				)}
			</div>
			<div className="mt-6">
				<hr />
				<h2 className="text-center text-xl">Notes Client</h2>
				<ClientNotes />
			</div>
		</fieldset>
	)
}
