import { ISupplier } from '@interfaces/supplier'
import { useSupplier } from '../context/SupplierContext'
import { useNavigate } from 'react-router-dom'
import { listStyles } from '@constants/styles/listStyles'
import { ButtonDeleteWithAuth } from '@components/atoms'

export const SupplierListItem: React.FC<{ item: ISupplier }> = ({
	item: supplier
}) => {
	const { state, dispatch } = useSupplier()
	const navigate = useNavigate()

	const handleNavigatetoSupplierSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_SUPPLIER',
			payload: supplier
		})
		navigate('specs')
	}

	return (
		<tr className={listStyles.tr}>
			<td
				onClick={handleNavigatetoSupplierSpecs}
				className={`${listStyles.td} hover:text-blue-600 hover:underline cursor-pointer`}
			>
				{supplier.name}
			</td>
			<td className={listStyles.td}>{supplier?.city}</td>
			<td className={listStyles.td}>{supplier?.contactPerson}</td>
			<td className={listStyles.td}>{supplier?.contactEmail}</td>
			<td className={`${listStyles.td} cursor-pointer`}>
				<ButtonDeleteWithAuth
					endpoint={'suppliers'}
					ID={supplier?._id}
					setter={(updatedSuppliers: ISupplier[]) =>
						dispatch({ type: 'SET_SUPPLIERS', payload: updatedSuppliers })
					}
					items={state.suppliers || []}
				/>
			</td>
		</tr>
	)
}
