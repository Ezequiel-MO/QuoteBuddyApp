import styles from '../FreeLancer.module.css'
import { getInitialValues } from './FreeLancerFormInitialValues'
import { getValidationSchema, FreeLancerFormFields } from '../'
import { useFormHandling } from '../../../hooks'

export const FreeLancerMasterForm = ({ freeLancer, handleSubmit }) => {
	const initialValues = getInitialValues(freeLancer)
	const validationSchema = getValidationSchema()

	const { data, setData, errors, handleChange, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const update = Object.keys(freeLancer).length > 0 ? true : false
	const typeFreeLancer = [
		'guide',
		'hostess',
		'travel-director',
		'account-manager'
	]

	const handleSelectLocation = (event) => {
		setData({
			...data,
			city: event.target.value
		})
	}

	const handleSubmitForm = async (event) => {
		event.preventDefault()
		const isValid = await validate()
		if (isValid) {
			handleSubmit(event, data, update)
		}
	}

	return (
		<div className={styles.divForm}>
			<form onSubmit={handleSubmitForm}>
				<FreeLancerFormFields
					data={data}
					setData={setData}
					errors={errors}
					typeFreeLancer={typeFreeLancer}
					handleBlur={handleBlur}
					update={update}
					handleChange={handleChange}
					handleSelectLocation={handleSelectLocation}
				/>
			</form>
		</div>
	)
}
