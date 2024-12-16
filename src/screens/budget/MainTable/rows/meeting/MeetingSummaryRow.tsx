import React from 'react'
import accounting from 'accounting'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { useCurrentProject } from 'src/hooks'

interface MeetingSummaryRowProps {
	type: 'morning' | 'afternoon' | 'full_day'
	date: string
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MeetingSummaryRow = ({
	type,
	date,
	isOpen,
	setIsOpen
}: MeetingSummaryRowProps) => {
	const { budget } = useCurrentProject()

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
			<td>{accounting.formatMoney(budget.meetingsCost || 0, '€')}</td>
		</tr>
	)
}
