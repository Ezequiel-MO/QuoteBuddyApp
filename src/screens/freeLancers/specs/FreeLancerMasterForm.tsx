import { FreeLancerFormFields } from '..'
import { useFormHandling } from '../../../hooks'
import { VALIDATIONS } from 'src/constants'
import { IFreelancer } from '@interfaces/freelancer'
import styles from '../FreeLancer.module.css'
import * as yup from 'yup'
import { getInitialValues } from './FreeLancerFormInitialValues'

interface Props {
	freeLancer: IFreelancer
	handleSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		data: IFreelancer,
		update: boolean
	) => void
}

export const FreeLancerMasterForm = ({ freeLancer, handleSubmit }: Props) => {
	const initialValues = getInitialValues(freeLancer)
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.freelancer

	const { data, setData, errors, handleChange, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const update = Object.keys(freeLancer).length > 0 ? true : false
	const typeFreeLancer = [
		'guide',
		'hostess',
		'travel-director',
		'account-manager'
	]

	const handleSelectLocation = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setData({
			...data,
			city: event.target.value
		})
	}

	const handleSubmitForm = async (
		event: React.ChangeEvent<HTMLFormElement>
	) => {
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
