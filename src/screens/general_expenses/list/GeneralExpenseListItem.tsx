import { useNavigate } from 'react-router-dom'
import { listStyles } from 'src/constants/listStyles'
import { IGeneralExpense } from '@interfaces/generalExpense'
import { useGeneralExpense } from '../context/GeneralExpensesContext'

interface GeneralExpenseListItemProps {
	item: IGeneralExpense
	canBeAddedToProject: boolean
}

export const GeneralExpenseListItem: React.FC<GeneralExpenseListItemProps> = ({
	item: generalExpense,
	canBeAddedToProject = false
}) => {
	const { dispatch } = useGeneralExpense()
	const navigate = useNavigate()

	const handleNavigatetoGeneralExpenseSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_EXPENSE',
			payload: generalExpense
		})
		navigate('/app/expense/specs')
	}

	return (
		<tr className={listStyles.tr}>
			<td
				onClick={handleNavigatetoGeneralExpenseSpecs}
				className={`${listStyles.td} hover:text-blue-600 hover:underline cursor-pointer`}
			>
				{generalExpense.name}
			</td>
		</tr>
	)
}
