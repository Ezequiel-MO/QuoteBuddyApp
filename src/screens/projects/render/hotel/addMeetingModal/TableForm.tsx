import { Icon } from '@iconify/react'

interface TableFormProps {
	index: number
	name: string
	timeOfEvent: string
	dayOfEvent: number
	meetingValues: Record<string, any>
	setMeetingValues: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

export const TableForm: React.FC<TableFormProps> = ({
	index,
	name,
	timeOfEvent,
	dayOfEvent,
	meetingValues,
	setMeetingValues
}) => {
	// Assume these are the values we need to display
	const values = meetingValues[`${timeOfEvent}-${dayOfEvent}`] || {
		roomCapacity:  '',
		FDRoomRate: '',
		HDRoomRate: '',
		coffeeBreakUnits: '',
		coffeeBreakPrice: '',
		aavvPackage: '',
		HDDDR: '',
		workingLunchUnits: '',
		workingLunchPrice: '',
		hotelDinnerUnits: '',
		hotelDinnerPrice: '',
		FDRate: '',
		HDRate: ''
	}

	// Function to handle value changes (implementing a stub if it's missing)
	const handleValueChange = (field: string, value: string) => {
		setMeetingValues({
			...meetingValues,
			[`${timeOfEvent}-${dayOfEvent}`]: {
				...values,
				[field]: value
			}
		})
	}

	// Get icon based on meeting time
	const getTimeIcon = () => {
		switch (timeOfEvent) {
			case 'morningMeetings':
				return 'mdi:weather-sunny'
			case 'afternoonMeetings':
				return 'mdi:weather-sunset'
			case 'fullDayMeetings':
				return 'mdi:calendar-clock'
			default:
				return 'mdi:clock-outline'
		}
	}

	return (
		<tr
			key={index}
			className="hover:bg-gray-700 transition-colors duration-150"
		>
			<td className="px-4 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<Icon
						icon={getTimeIcon()}
						className="mr-2 text-cyan-400"
						width="20"
						height="20"
					/>
					<span className="font-medium text-white-0">{name}</span>
				</div>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.roomCapacity}
					onChange={(e) => handleValueChange('roomCapacity', e.target.value)}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.coffeeBreakUnits}
					onChange={(e) =>
						handleValueChange('coffeeBreakUnits', e.target.value)
					}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.coffeeBreakPrice}
					onChange={(e) =>
						handleValueChange('coffeeBreakPrice', e.target.value)
					}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.aavvPackage}
					onChange={(e) => handleValueChange('aavvPackage', e.target.value)}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.HDDDR}
					onChange={(e) => handleValueChange('HDDDR', e.target.value)}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.workingLunchUnits}
					onChange={(e) =>
						handleValueChange('workingLunchUnits', e.target.value)
					}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.workingLunchPrice}
					onChange={(e) =>
						handleValueChange('workingLunchPrice', e.target.value)
					}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.hotelDinnerUnits}
					onChange={(e) =>
						handleValueChange('hotelDinnerUnits', e.target.value)
					}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.hotelDinnerPrice}
					onChange={(e) =>
						handleValueChange('hotelDinnerPrice', e.target.value)
					}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.FDRate}
					onChange={(e) => handleValueChange('FDRate', e.target.value)}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>

			<td className="px-4 py-4 whitespace-nowrap">
				<input
					type="number"
					value={values.HDRate}
					onChange={(e) => handleValueChange('HDRate', e.target.value)}
					className="w-24 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
				/>
			</td>
		</tr>
	)
}
