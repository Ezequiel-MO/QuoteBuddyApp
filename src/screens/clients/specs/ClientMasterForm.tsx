import { FC, useEffect } from 'react'
import { useGetCountries } from '../../../hooks'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues, quoteLanguage } from '../../../constants'
import { ClientFormFields } from './ClientFormFields'
import { useFormHandling } from 'src/hooks'
import { SubmitInput } from '../../../components/atoms'
import { IClient } from 'src/interfaces/'
import * as yup from 'yup'

interface ClientMasterFormProps {
	submitForm: (
		data: IClient,
		endpoint: string,
		update: boolean
	) => Promise<void>
	client: IClient // Assuming this is the correct type based on usage
	update: boolean
	preValues?: IClient
}

const ClientMasterForm: FC<ClientMasterFormProps> = ({ submitForm, client, preValues }) => {
	const { countries } = useGetCountries()
	const update = Object.keys(client).length > 0 ? true : false
	const initialValues = generateFormValues(formsValues.client, client)
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.client

	const { data, setData, errors, handleChange, handleBlur, validate } = useFormHandling(initialValues, validationSchema)

	const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const isValid = await validate()
		if (isValid) {
			submitForm(data as IClient, "clients", update)
		}
	}

	//seteo los valores previos para que no se renicien si el servidor manda un error
	useEffect(() => {
		if (preValues) {
			setData(preValues)
		}
	}, [preValues])

	return (
		<div className=" justify-center items-center">
			<form className="space-y-2" onSubmit={(event) => handleSubmitForm(event)}>
				<ClientFormFields
					data={data}
					countries={countries}
					errors={errors}
					handleChange={handleChange}
					handleBlur={handleBlur}
					quoteLanguage={quoteLanguage}
				/>
				<div className='flex justify-center items-center'>
					<SubmitInput update={update} title='Client' />
				</div>
			</form>
		</div>
	)
}

export default ClientMasterForm
