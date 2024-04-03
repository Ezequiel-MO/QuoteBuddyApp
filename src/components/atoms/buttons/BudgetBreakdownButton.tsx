import { ArrowIcon } from '../ArrowIcon'

interface Props {
	onClick: () => void
	item: 'Meeting' | 'Hotel' | 'Venue' | 'Entertainment'
	isOpen: boolean
}

export const BudgetBreakdownButton = ({ onClick, item, isOpen }: Props) => {
	return (
		<tr className="w-full bg-white-100 dark:bg-[#a9ba9d]">
			<td colSpan={6} className="p-0 bg-transparent">
				<button
					id="hotel-details"
					className="rounded-full p-2 transition duration-200 ease-in-out hover:bg-gray-200 text-black-50"
					onClick={onClick}
				>
					{isOpen ? `Hide ${item} Details` : `Show ${item} Details`}
					<ArrowIcon open={isOpen} />
				</button>
			</td>
		</tr>
	)
}
