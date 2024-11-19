import { FC } from 'react'
import { IGeneralExpense } from '../../../interfaces/generalExpense'

interface GeneralExpenseCategorySelectorProps {
	categories: IGeneralExpense['category'][]
	selectedCategory: IGeneralExpense['category']
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
}

export const GeneralExpenseCategorySelector: FC<
	GeneralExpenseCategorySelectorProps
> = ({ categories, selectedCategory, handleChange, handleBlur }) => {
	return (
		<div>
			<label className="uppercase text-xl text-gray-600 font-bold">
				Category
			</label>
			<select
				className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
				name="category"
				value={selectedCategory}
				onChange={handleChange}
				onBlur={handleBlur}
			>
				<option value="">-- Choose an option --</option>
				{categories?.map((el, index) => {
					return (
						<option value={el} key={index}>
							{el}
						</option>
					)
				})}
			</select>
		</div>
	)
}
