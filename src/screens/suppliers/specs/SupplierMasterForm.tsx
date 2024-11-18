import { useNavigate } from 'react-router-dom'
import { useSupplier } from '../context/SupplierContext'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetSupplierFilters } from './resetSupplierFields'
import { SupplierFormFields } from './SupplierFormFields'
import { Button } from '@components/atoms'

const SupplierMasterForm = () => {
	const { state, dispatch } = useSupplier()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update
		if (isUpdating) {
			await updateEntity(
				'suppliers',
				state.currentSupplier,
				state.suppliers || [],
				dispatch
			)
		} else {
			await createEntity('suppliers', state.currentSupplier, [], dispatch)
		}
		resetSupplierFilters(dispatch, {
			city: ''
		})
		navigate('/app/supplier')
	}

	return (
		<form onSubmit={handleSubmit}>
			<SupplierFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}

export default SupplierMasterForm
