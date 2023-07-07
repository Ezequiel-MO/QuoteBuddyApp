import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { TextInput, SelectInput } from '../../../ui'
import { useGetCountries } from '../../../hooks'
import { SelectQuoteLanguage } from './SelectQuoteLanguage'
import { generateFormValues } from '../../../helper'
import { formsValues } from '../../../constants'

const ClientMasterForm = ({ submitForm, client }) => {
	const { countries } = useGetCountries()

	const update = Object.keys(client).length > 0 ? true : false

	const quoteLanguage = [
		'EN',
		'FR',
		'IT',
		'ES',
		'DE',
		'NL',
		'BE',
		'RO',
		'DK',
		'SE'
	]

	return (
		<>
			<Formik
				initialValues={generateFormValues(formsValues.client, client)}
				onSubmit={(values) => {
					submitForm(values, 'clients', update)
				}}
				enableReinitialize
				validationSchema={Yup.object({
					firstName: Yup.string().required('Required'),
					familyName: Yup.string().required('Required'),
					email: Yup.string().required('Required'),
					// clientCompany: Yup.string().required('Required'),
					phone: Yup.string(),
					quoteLanguage: Yup.string().required('Required'),
					country: Yup.string().required('Required')
				})}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-full">
						<Form>
							<fieldset className="grid grid-cols-2 gap-2">
								<legend>
									<h1 className="text-2xl mb-4">Account Manager Details</h1>
								</legend>
								<div className="form-group mb-6">
									<div className="flex	 items-center gap-5">
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
									<div className="flex items-center gap-5">
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
									<div className="flex items-center gap-5">
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
									{/* <TextInput
										label="Client Company"
										name="clientCompany"
										placeholder="Client Name"
										type="text"
									/> */}

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
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default ClientMasterForm
