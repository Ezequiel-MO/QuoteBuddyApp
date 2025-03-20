import React, { useEffect } from 'react'
import { HotelTotalCost } from './HotelTotalCost'
import { OptionSelect } from '../../multipleOrSingle/OptionSelect'

import { useCurrentProject } from 'src/hooks'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { CategoryIndicator } from '@screens/budget/CategoryIndicator'

interface HotelSummaryRowProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HotelSummaryRow: React.FC<HotelSummaryRowProps> = ({
	isOpen,
	setIsOpen
}) => {
	const {
		currentProject: { multiDestination = false, hotels = [], schedule },
		budget: { selectedHotel },
		setBudgetSelectedHotel,
		setBudgetSelectedHotelCost,
		updateBudgetMeetingsTotalCost,
		clearMeetingsBudget
	} = useCurrentProject()

	if (!hotels || hotels.length === 0) {
		return null
	}

	const hotelName = selectedHotel?.name

	useEffect(() => {
		updateBudgetMeetingsTotalCost(0)
		clearMeetingsBudget()
		if (hotelName) {
			setBudgetSelectedHotelCost(selectedHotel, schedule.length - 1)
		}
	}, [selectedHotel])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedHotelName = e.target.value
		const selectedHotel = hotels.find(
			(hotel) => hotel.name === selectedHotelName
		)
		if (selectedHotel) {
			setBudgetSelectedHotel(selectedHotel)
		}
	}

	return (
		<tr className="bg-gray-900/20 border-b border-gray-700/50 hover:bg-blue-900/30 transition-colors duration-150">
			<ToggleTableRowIcon isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
			<td className="py-4 px-4 font-medium text-white-0 flex items-center space-x-2">
				<CategoryIndicator type="accommodation" />
				<span className="text-blue-200">
					{multiDestination ? 'Overnight @' : 'Accommodation'}
				</span>
			</td>
			<td className="py-4 px-4">
				{hotels?.length === 1 ? (
					<div className="font-medium text-white-0">
						{hotelName || hotels[0]?.name}
					</div>
				) : (
					<div className="w-full max-w-md">
						<OptionSelect
							options={hotels}
							value={hotelName || hotels[0]?.name || ''}
							handleChange={handleChange}
						/>
					</div>
				)}
			</td>
			<td className="py-4 px-4"></td>
			<td className="py-4 px-4"></td>
			<td className="py-4 px-4 font-semibold text-white-0">
				<HotelTotalCost />
			</td>
		</tr>
	)
}
