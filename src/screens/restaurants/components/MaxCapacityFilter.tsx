import { ChangeEvent, FC } from 'react'
import { filterStyles } from 'src/constants'

interface MaxCapacityFilterProps {
	maxCapacity: number
	setMaxCapacity: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const MaxCapacityFilter: FC<MaxCapacityFilterProps> = ({
	maxCapacity,
	setMaxCapacity
}) => {
	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="maxCapacity"
				name="maxCapacity"
				className={filterStyles['select']}
				value={maxCapacity}
				onChange={setMaxCapacity}
			>
				<option value="">Select Capacity</option>
				<option value="50">Up to 50</option>
				<option value="100">Up to 100</option>
				<option value="200">Up to 200</option>
				<option value="300">Up to 300</option>
				<option value="301">More than 300</option>
			</select>
		</div>
	)
}
