import { useNavigate } from 'react-router-dom'
import { useGeneralExpense } from '../context/GeneralExpensesContext'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { Button } from '@components/atoms'
import { GeneralExpenseFormFields } from './GeneralExpenseFormFields'
import { resetGeneralExpenseFilters } from './resetGeneralExpenseFields'
import initialState from '../context/initialState'
import { IGeneralExpense } from '@interfaces/generalExpense'

export const GeneralExpenseMasterForm = () => {
	const { state, dispatch, setForceRefresh } = useGeneralExpense()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity('expenses', state.currentExpense, [], dispatch)
		} else {
			await createEntity('expenses', state.currentExpense, [], dispatch)
		}
		resetGeneralExpenseFilters(
			dispatch,
			initialState.currentExpense as IGeneralExpense
		)
		setForceRefresh((prev) => prev + 1)
		navigate('/app/expense')
	}
	return (
		<form onSubmit={handleSubmit}>
			<GeneralExpenseFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}
