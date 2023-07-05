import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { useGetCountries } from '../../../hooks'
import { ClientFormFields } from './ClientFormFields'

const ClientMasterForm = ({ submitForm, client = {} }) => {
	const { countries } = useGetCountries()
	const initialValues = {
		firstName: client?.firstName ?? '',
		familyName: client?.familyName ?? '',
		email: client?.email ?? '',
		clientCompany: client?.clientCompany ?? '',
		phone: client?.phone ?? '',
		quoteLanguage: client?.quoteLanguage ?? '',
		country: client?.country ?? ''
	}

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
				initialValues={initialValues}
				onSubmit={(values) => {
					submitForm(values, 'clients', update)
				}}
				enableReinitialize
				validationSchema={Yup.object({
					firstName: Yup.string().required('Required'),
					familyName: Yup.string().required('Required'),
					email: Yup.string().required('Required'),
					phone: Yup.string(),
					quoteLanguage: Yup.string().required('Required'),
					country: Yup.string().required('Required')
				})}
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
