import { useNavigate } from 'react-router-dom'
import { listStyles } from '@constants/styles/listStyles'
import { IGeneralExpense } from '@interfaces/generalExpense'
import { useGeneralExpense } from '../context/GeneralExpensesContext'
import { GeneralExpenseActions } from './GeneralExpenseActions'

interface GeneralExpenseListItemProps {
	item: IGeneralExpense
	canBeAddedToProject: boolean
}

export const GeneralExpenseListItem: React.FC<GeneralExpenseListItemProps> = ({
	item: generalExpense,
	canBeAddedToProject = false
}) => {
	const { dispatch, state } = useGeneralExpense()
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
		<tr className={listStyles.tr} key={generalExpense._id}>
			<td
				onClick={handleNavigatetoGeneralExpenseSpecs}
				className={`${listStyles.td} hover:text-blue-600 hover:underline cursor-pointer`}
			>
				{generalExpense.name}
			</td>
			<td className={`${listStyles.td}`}>{generalExpense.category}</td>
			<td align="left" className={`${listStyles.td}`}>
				<GeneralExpenseActions
					generalExpense={generalExpense}
					allGeneralExpense={state.expenses}
				/>
			</td>
		</tr>
	)
}
