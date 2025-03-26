import React from 'react'
import accounting from 'accounting'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { useCurrentProject } from 'src/hooks'
import { meetingTotalCost } from 'src/redux/features/currentProject/helpers/meetingCost'
import { IMeeting } from '../../../../../interfaces'
import { Icon } from '@iconify/react'

interface MeetingSummaryRowProps {
	type: 'morning' | 'afternoon' | 'full_day'
	date: string
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	meeting: IMeeting
}

export const MeetingSummaryRow = ({
	type,
	date,
	isOpen,
	setIsOpen,
	meeting
}: MeetingSummaryRowProps) => {
	const { budget, currentProject } = useCurrentProject()

	const toggleBreakdown = () => {
		setIsOpen((prevState: boolean) => !prevState)
	}

	// Format meeting type for display
	const formatMeetingType = () => {
		if (type === 'full_day') return 'Full Day'
		return type.charAt(0).toUpperCase() + type.slice(1)
	}

	// Calculate total cost
	const totalCost = meetingTotalCost(meeting, type, currentProject.nrPax)

	return (
		<tr
			className={`${tableRowClasses} bg-gradient-to-r from-purple-900/10 to-purple-800/20 hover:from-purple-900/20 hover:to-purple-800/30 transition-colors duration-150 border-b border-purple-900/30`}
		>
			<td className="w-14 pl-6">
				<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
			</td>
			<td className={`${tableCellClasses} flex items-center space-x-2`}>
				<Icon
					icon="mdi:calendar-clock"
					className="text-purple-400"
					width={18}
				/>
				<span className="text-gray-200">{`Meeting (${date})`}</span>
			</td>
			<td
				className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] py-4 px-4 text-gray-300"
				title={`${formatMeetingType()} Meeting @ ${budget.selectedHotel?.name}`}
			>
				{`${formatMeetingType()} Meeting @ ${budget.selectedHotel?.name}`}
			</td>
			<td className="py-4 px-4">
				<span className="bg-purple-800/40 text-purple-100 font-semibold py-1 px-3 rounded-full text-sm">
					{currentProject.nrPax}
				</span>
			</td>
			<td className="py-4 px-4"></td>
			<td className="py-4 px-6 font-bold text-lg text-white-0 group-hover:text-green-200 transition-colors duration-200">
				{accounting.formatMoney(totalCost, '€')}
			</td>
		</tr>
	)
}
