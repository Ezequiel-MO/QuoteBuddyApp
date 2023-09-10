import { IEntertainment } from 'src/interfaces/entertainment'
import { EntertainmentFormFields } from './EntertainmentFormFields'
import { getInitialValues } from './EntertainmentFormInitialValues'
import { getValidationSchema } from './EntertainmentFormValidation'
import { useFormHandling } from 'src/hooks'
import * as yup from 'yup'

interface Props {
	entertainmentShow: IEntertainment
	handleSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		data: IEntertainment,
		update: boolean
	) => void
	textContent: string
	setTextContent: React.Dispatch<React.SetStateAction<string>>
}

export const EntertainmentMasterForm = ({
	entertainmentShow,
	handleSubmit,
	textContent,
	setTextContent
}: Props) => {
	const initialValues = getInitialValues(entertainmentShow) as IEntertainment
	const validationSchema =
		getValidationSchema() as unknown as yup.ObjectSchema<IEntertainment>

	const { data, setData, errors, handleChange, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const update = Object.keys(entertainmentShow).length > 0 ? true : false

	const handleSelectLocation = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setData({
			...data,
			city: event.target.value
		})
	}

	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		handleSubmit(event, data, update)
	}

	return (
		<form onSubmit={handleSubmitForm}>
			<EntertainmentFormFields
				data={data as IEntertainment}
				setData={setData}
				errors={errors}
				handleChange={handleChange}
				update={update}
				handleBlur={handleBlur}
				handleSelectLocation={handleSelectLocation}
				textContent={textContent}
				setTextContent={setTextContent}
			/>
		</form>
	)
}
