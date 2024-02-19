import React from 'react'
import accounting from 'accounting'
import { useContextBudget } from '../../../context/BudgetContext'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'

interface MeetingSummaryRowProps {
	type: 'morning' | 'afternoon' | 'full_day'
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MeetingSummaryRow = ({
	type,
	isOpen,
	setIsOpen
}: MeetingSummaryRowProps) => {
	const { state } = useContextBudget()

	const toggleBreakdown = () => {
		setIsOpen((prevState: boolean) => !prevState)
	}

	return (
		<tr className={tableRowClasses}>
			<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
			<td className={tableCellClasses}></td>
			<td
				className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]"
				title={`Select another hotel above to get prices for other hotel`}
			>{`${type} Meeting @ ${state.selectedHotel?.name}`}</td>
			<td></td>
			<td></td>
			<td>{accounting.formatMoney(state.meetingsCost || 0, '€')}</td>
		</tr>
	)
}
