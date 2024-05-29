import { FC, useEffect, useState } from 'react'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues, quoteLanguage } from '../../../constants'
import { ClientFormFields } from './ClientFormFields'
import { useFormHandling } from 'src/hooks'
import { SubmitInput } from '../../../components/atoms'
import { IClient, ICountry, IClientNote } from 'src/interfaces/'
import * as yup from 'yup'
import { useFetchCountries } from 'src/hooks/fetchData/useFetchCountries'

interface ClientMasterFormProps {
	submitForm: (
		data: IClient,
		endpoint: string,
		update: boolean
	) => Promise<void>
	client: IClient // Assuming this is the correct type based on usage
	preValues?: IClient
}

const ClientMasterForm: FC<ClientMasterFormProps> = ({
	submitForm,
	client,
	preValues
}) => {
	const { countries } = useFetchCountries() as { countries: ICountry[] }
	const update = Object.keys(client).length > 0 ? true : false
	//array para ".tsx"  cada elemento del array es un objeto que representa una "Note".
	const [notes, setNotes] = useState<IClientNote[]>([])

	const initialValues = generateFormValues(formsValues.client, client)
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.client

	const { data, setData, errors, handleChange, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()
		const clientNotes = [...notes]
		data.clientNotes = clientNotes
		console.log(data)
		const isValid = await validate()
		if (isValid) {
			submitForm(data as IClient, 'clients', update)
		}
	}

	useEffect(() => {
		const isClientNotes = client.clientNotes?.length
		if (isClientNotes && client.clientNotes) {
			setNotes(client.clientNotes)
		}
	}, [update])

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
					setData={setData}
					countries={countries}
					errors={errors}
					handleChange={handleChange}
					handleBlur={handleBlur}
					quoteLanguage={quoteLanguage}
					update={update}
					notes={notes}
					setNotes={setNotes}
				/>
				<div className="flex justify-center items-center">
					<SubmitInput update={update} title="Client" />
				</div>
			</form>
		</div>
	)
}

export default ClientMasterForm
