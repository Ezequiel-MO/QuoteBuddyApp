import { FC } from 'react'

interface ProjectStatusSelectorProps {
	options: string[]
	status: string
	handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ProjectStatusSelector: FC<ProjectStatusSelectorProps> = ({
	options,
	status,
	handleChange
}) => {
	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<select
				className="cursor-pointer w-full py-1 px-2 border-0 rounded-md bg-gray-700 text-center focus:text-white focus:border-blue-500 focus:outline-none"
				name="status"
				value={status}
				onChange={handleChange}
			>
				<option value="">-- Choose an option --</option>
				{options.map((el, index) => (
					<option value={el} key={index}>
						{el}
					</option>
				))}
			</select>
		</div>
	)
}
