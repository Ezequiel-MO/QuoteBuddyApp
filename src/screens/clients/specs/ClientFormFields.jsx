import { SelectInput, TextInput } from '../../../ui'
import { SelectQuoteLanguage } from './SelectQuoteLanguage'

export const ClientFormFields = ({
	formik,
	countries,
	quoteLanguage,
	update
}) => {
	return (
		<fieldset className="flex items-center justify-center">
			<legend>
				<h1 className="text-2xl mb-4">Client Details</h1>
			</legend>
			<div className="mb-6">
				<div className="flex items-center gap-2">
					<TextInput
						label="First Name"
						name="firstName"
						placeholder="ex : Jonas ..."
						type="text"
					/>
					<TextInput
						label="Family Name"
						name="familyName"
						placeholder="ex : Smith ..."
						type="text"
					/>
				</div>
				<div className="flex items-center gap-2">
					<TextInput
						label="Email"
						name="email"
						placeholder="ex : jonas.smith@example.com ..."
						type="text"
					/>
					<TextInput
						label="Phone Nr"
						name="phone"
						placeholder="+46 1234 12345 ..."
						type="text"
					/>
				</div>
				<div className="flex items-center gap-2">
					<SelectQuoteLanguage
						options={quoteLanguage}
						name="quoteLanguage"
						label="Quote Language"
						value={formik.values.quoteLanguage}
					/>
					<SelectInput
						label="Country"
						name="country"
						placeholder="ie UK, DK, ES, RO ..."
						options={countries}
						value={formik.values.country}
					/>
				</div>

				<div className="form-group mb-6">
					<input
						data-testid="btn-submit"
						type="submit"
						className="cursor-pointer mt-6 py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
						value={update ? 'Edit Client Form' : 'Create new Client'}
					/>
				</div>
			</div>
		</fieldset>
	)
}
