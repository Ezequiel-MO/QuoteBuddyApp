import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { TextInput } from '../../../ui'

const CountryMasterForm = ({ submitForm, country }) => {
	const initialValues = {
		name: country?.name ?? '',
		accessCode: country?.accessCode ?? '',
		quoteLanguage: country?.quoteLanguage ?? ''
	}

	const update = Object.keys(country).length > 0 ? true : false

	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					submitForm(values, 'countries', update)
				}}
				enableReinitialize
				validationSchema={Yup.object({
					name: Yup.string().required('Required'),
					accessCode: Yup.string().required('Required'),
					quoteLanguage: Yup.string().required('Required')
				})}
			>
				{(formik) => (
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

									<div className="form-group mb-6">
										<input
											data-testid="btn-submit"
											type="submit"
											className="cursor-pointer mt-6 py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
											value={
												update ? 'Edit Country Form' : 'Create new Country'
											}
										/>
									</div>
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
