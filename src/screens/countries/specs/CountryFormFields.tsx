import { TextInput } from '../../../components/atoms'
import { useCountry } from '../context/CountriesContext'

export const CountryFormFields = () => {
	const { state, handleChange, handleBlur, errors } = useCountry()
	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					Country Details
				</h1>
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<TextInput
					name="name"
					value={state.currentCountry?.name || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.name}
					placeholder="Country Name"
				/>
				<TextInput
					name="accessCode"
					value={state.currentCountry?.accessCode || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.accessCode}
					placeholder="Country Code"
				/>
				<TextInput
					name="quoteLanguage"
					value={state.currentCountry?.quoteLanguage || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.quoteLanguage}
					placeholder="Quote Language"
				/>
			</div>
		</fieldset>
	)
}
