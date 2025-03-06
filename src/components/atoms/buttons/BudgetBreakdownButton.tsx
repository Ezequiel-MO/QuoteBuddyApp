import React from 'react'
import { ArrowIcon } from '../ArrowIcon'
import { BaseButton } from './BaseButton'

interface Props {
	onClick: () => void
	item: 'Meeting' | 'Hotel' | 'Venue' | 'Entertainment'
	isOpen: boolean
}

export const BudgetBreakdownButton: React.FC<Props> = ({
	onClick,
	item,
	isOpen
}) => {
	return (
		<tr className="w-full bg-white-100 dark:bg-[#a9ba9d]">
			<td colSpan={6} className="p-0 bg-transparent">
				<BaseButton
					id="hotel-details"
					onClick={onClick}
					className="rounded-full p-2 transition duration-200 ease-in-out hover:bg-gray-200 text-black-50"
				>
					{isOpen ? `Hide ${item} Details` : `Show ${item} Details`}
					<ArrowIcon open={isOpen} />
				</BaseButton>
			</td>
		</tr>
	)
}
