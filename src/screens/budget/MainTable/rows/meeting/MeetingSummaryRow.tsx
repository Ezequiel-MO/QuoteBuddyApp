import React from 'react'
import accounting from 'accounting'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { useCurrentProject } from 'src/hooks'
import { meetingTotalCost } from 'src/redux/features/currentProject/helpers/meetingCost'
import { IMeeting } from '../../../../../interfaces'

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

	return (
		<tr className={tableRowClasses}>
			<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
			<td className={tableCellClasses}>{`Meeting (${date})`}</td>
			<td
				className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]"
				title={`Select another hotel above to get prices for other hotel`}
			>{`${type} Meeting @ ${budget.selectedHotel?.name}`}</td>
			<td></td>
			<td></td>
			<td>
				{
					accounting.formatMoney(meetingTotalCost(meeting, type, currentProject.nrPax), '€')
				}
			</td>
		</tr>
	)
}
