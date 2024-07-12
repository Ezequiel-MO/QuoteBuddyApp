import { TextInput } from '../../../components/atoms'
import { useCompany } from '../context/CompanyContext'
import { AddClientToCompanyForm } from './AddClientToCompanyForm'
import { CountrySelector } from '@components/atoms/filters/CountrySelector'
import { useApiFetch } from 'src/hooks/fetchData'
import { ICountry } from '@interfaces/country'

export const CompanyFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } = useCompany()
	const { data: countries } = useApiFetch<ICountry[]>('countries')

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					Company Details
				</h1>
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<TextInput
					name="name"
					type="text"
					value={state.currentCompany?.name}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.name}
				/>
				<TextInput
					name="address"
					value={state.currentCompany?.address}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.address}
				/>
				<TextInput
					name="postCode"
					value={state.currentCompany?.postCode}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.postCode}
				/>
				<TextInput
					name="VATNr"
					value={state.currentCompany?.VATNr}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.VATNr}
				/>
				<CountrySelector
					country={state.currentCompany?.country as string}
					options={countries}
					errors={errors}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
			</div>
			<div className="w-full">
				<AddClientToCompanyForm
					employees={state.currentCompany?.employees || []}
					handleChange={handleChange}
					handleBlur={handleBlur}
					removeEmployee={(id: string) => {
						dispatch({
							type: 'REMOVE_EMPLOYEE',
							payload: id
						})
					}}
				/>
			</div>
		</fieldset>
	)
}
