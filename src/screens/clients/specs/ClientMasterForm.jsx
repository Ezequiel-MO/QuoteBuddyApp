import { Form, Formik } from 'formik'
import { useGetCountries } from '../../../hooks'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues, quoteLanguage } from '../../../constants'
import { ClientFormFields } from './ClientFormFields'

const ClientMasterForm = ({ submitForm, client = {} }) => {
	const { countries } = useGetCountries()

	const update = Object.keys(client).length > 0 ? true : false

	return (
		<>
			<Formik
				initialValues={generateFormValues(formsValues.client, client)}
				onSubmit={(values) => {
					submitForm(values, 'clients', update)
				}}
				enableReinitialize
				validationSchema={VALIDATIONS.client}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-full">
						<Form>
							<ClientFormFields
								formik={formik}
								countries={countries}
								quoteLanguage={quoteLanguage}
								update={update}
							/>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default ClientMasterForm
