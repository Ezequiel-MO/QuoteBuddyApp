/* import { FC } from 'react'
import { useLocation } from 'react-router-dom' */
import { TextInput } from '@components/atoms'
/* import { ClientLanguageSelector } from './ClientLanguageSelector'
import { ClientCountrySelector } from './ClientCountrySelector'
import { SelectCompany } from './SelectCompany'
import { IClient, ICountry, IClientNote } from 'src/interfaces/'
import { ClientOrigin } from './ClientOrigin'
import { ClientQualification } from './ClientQualification'
import { ClientNotes } from './ClientNotes' */
import { useClient } from '../context/ClientContext'
import { AddCompanyToClientForm } from './AddCompanyToClientForm'

export const ClientFormFields = () => {
	const { state, handleChange, handleBlur, errors } = useClient()

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
			{/* 
			<div className="space-y-4">
				
			</div>
			<div className="flex space-x-4">
				<div className="w-1/2">
					<ClientLanguageSelector
						quoteLanguage={data.quoteLanguage}
						options={quoteLanguage}
						errors={errors}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="w-1/2">
					<ClientCountrySelector
						country={data.country as string}
						options={countries}
						errors={errors}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
				</div>
			</div>
			<div>
				<SelectCompany data={data} setData={setData} />
			</div>
			<div className="mt-6">
				<hr />
				<ClientOrigin data={data} setData={setData} update={update} />
			</div>
			<div className="mt-6">
				<hr />
				<ClientQualification data={data} setData={setData} update={update} />
			</div>
			<div className="mt-6">
				<hr />
				<h2 className="text-center text-xl">Notes Client</h2>
				<ClientNotes
					data={data}
					setData={setData}
					notes={notes}
					setNotes={setNotes}
				/>
			</div> */}
		</fieldset>
	)
}
