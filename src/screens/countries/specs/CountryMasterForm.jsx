import { Form, Formik } from 'formik'
import { TextInput } from '../../../ui'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'
import { SubmitInput } from '@components/atoms'

const CountryMasterForm = ({ submitForm, country }) => {
	const update = Object.keys(country).length > 0 ? true : false
	const files = []

	return (
		<>
			<Formik
				initialValues={generateFormValues(formsValues.country, country)}
				onSubmit={(values) => {
					submitForm(values, files, 'countries', update)
				}}
				enableReinitialize
				validationSchema={VALIDATIONS.country}
			>
				{() => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-full">
						<Form>
							<fieldset className="grid grid-cols-2 gap-2">
								<legend>
									<h1 className="text-2xl mb-4">Country Details</h1>
								</legend>
								<div className="form-group mb-6">
									<TextInput
										label="Country Name"
										name="name"
										placeholder="ex : Sweden ..."
										type="text"
									/>

									<TextInput
										label="Web country code"
										name="accessCode"
										placeholder="ex : CZ, ES ..."
										type="text"
									/>

									<TextInput
										label="Quoted in ..."
										name="quoteLanguage"
										placeholder="ex : EN, ES ..."
										type="text"
									/>
									<SubmitInput update={update} title="Country" />
								</div>
							</fieldset>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default CountryMasterForm
