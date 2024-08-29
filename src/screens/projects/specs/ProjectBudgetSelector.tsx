import { FC } from 'react'

interface IBudget {
	name: string
	value: string
}

interface ProjectBudgetSelectorProps {
	options: IBudget[]
	budget: string
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
}

export const ProjectBudgetSelector: FC<ProjectBudgetSelectorProps> = ({
	options,
	budget,
	handleChange
}) => {
	return (
		<div className="mb-4">
			<label className="block uppercase text-xl text-gray-600 font-bold mb-2">
				Budget
			</label>
			<select
				className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
				name="budget"
				value={budget}
				onChange={handleChange}
			>
				<option value="">-- Choose an option --</option>
				{options.map((el, index) => (
					<option value={el.value} key={index}>
						{el.name}
					</option>
				))}
			</select>
		</div>
	)
}
