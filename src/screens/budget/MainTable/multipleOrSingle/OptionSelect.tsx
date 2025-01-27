import { Icon } from '@iconify/react'
import {
	IEntertainment,
	IEvent,
	IGift,
	IHotel,
	IRestaurant
} from '../../../../interfaces'

export interface OptionSelectProps {
	options: IEvent[] | IRestaurant[] | IHotel[] | IGift[] | IEntertainment[]
	value: string
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const OptionSelect = ({
	options,
	value,
	handleChange
}: OptionSelectProps) => {
	return (
		<div className="relative text-gray-300 py-2 w-full">
			<div className="w-full max-w-[15rem] mx-auto">
				<select
					value={value || ''}
					onChange={handleChange}
					className="w-full py-2 pl-3 pr-10 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer transition-all duration-200"
				>
					{options.map((option) => (
						<option
							key={option._id}
							value={option.name}
							className="bg-gray-800 text-gray-300"
						>
							{option.name}
						</option>
					))}
				</select>
				<Icon
					icon="mdi:chevron-down"
					className="absolute top-1/2 right-3 text-gray-400 transform -translate-y-1/2 pointer-events-none"
					width="1.2em"
					height="1.2em"
				/>
			</div>
		</div>
	)
}
