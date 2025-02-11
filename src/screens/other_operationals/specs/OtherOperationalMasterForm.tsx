import { useNavigate } from 'react-router-dom'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { Button } from '@components/atoms'
import { useOtherOperational } from '../context/OtherOperationalsContext'
import { OtherOperationalFormFields } from './OtherOperationalFormFields'
import { resetOtherOperationalFilters } from './resetOtherOperationalFields'

export const OtherOperationalMasterForm = () => {
	const { state, dispatch } = useOtherOperational()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update
		if (isUpdating) {
			await updateEntity(
				'OtherOperationals',
				state.currentOtherOperational,
				[],
				dispatch
			)
		} else {
			await createEntity(
				'OtherOperationals',
				state.currentOtherOperational,
				[],
				dispatch
			)
		}
		resetOtherOperationalFilters(dispatch, {
			city: ''
		})
		navigate('/app/other_operational')
	}

	return (
		<form onSubmit={handleSubmit}>
			<OtherOperationalFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}
