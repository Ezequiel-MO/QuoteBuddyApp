import { TextInput } from '@components/atoms'
import { useGeneralExpense } from '../context/GeneralExpensesContext'
import TextEditor from '@components/molecules/TextEditor'
import { useCallback } from 'react'
import { GeneralExpenseCategorySelector } from './GeneralExpenseCategorySelector'

export const GeneralExpenseFormFields: React.FC = () => {
	const { state, dispatch, handleChange, handleBlur, errors } =
		useGeneralExpense()

	const handleTextContentChange = useCallback((textContent: string) => {
		dispatch({
			type: 'UPDATE_EXPENSE_FIELD',
			payload: { name: 'description', value: textContent }
		})
	}, [])

	const general_expense_categories: (
		| 'rent'
		| 'salary'
		| 'services'
		| 'supplies'
		| 'other'
	)[] = ['rent', 'salary', 'services', 'supplies', 'other']

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General General Expense Data
				</h1>
			</legend>
			<div className="space-y-6">
				<TextInput
					type="text"
					label="Name"
					placeholder="Expense Name"
					name="name"
					value={state.currentExpense?.name || ''}
					handleChange={handleChange}
					errors={errors.name}
					handleBlur={handleBlur}
				/>
				<GeneralExpenseCategorySelector
					categories={general_expense_categories}
					selectedCategory={state.currentExpense?.category || 'other'}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
				<div>
					<h2 className="text-center text-xl">Description General Expense</h2>
					<label className="block uppercase text-lg text-gray-3 font-medium">
						Description (English)
					</label>
					<TextEditor
						value={state.currentExpense?.description || ''}
						onChange={handleTextContentChange}
					/>
				</div>
			</div>
		</fieldset>
	)
}
