import { useEffect } from 'react'
import accounting from 'accounting'
import { IEntertainment } from '../../../../../interfaces'
import { OptionSelect } from '../../multipleOrSingle'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { useCurrentProject } from 'src/hooks'
import { UpdateProgramShowsCostPayload } from 'src/redux/features/currentProject/types'
import { Icon } from '@iconify/react'

interface Props {
	date: string
	entertainment: IEntertainment[]
	selectedEntertainment: IEntertainment
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	typeOfEvent: 'dinner' | 'lunch'
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntertainmentSummaryRow: React.FC<Props> = ({
	date,
	entertainment,
	selectedEntertainment,
	handleChange,
	typeOfEvent,
	isOpen,
	setIsOpen
}) => {
	const {
		budget: { showsCost },
		updateBudgetProgramShowCost
	} = useCurrentProject()

	useEffect(() => {
		const payload: UpdateProgramShowsCostPayload = {
			date,
			show: selectedEntertainment,
			type: typeOfEvent
		}
		updateBudgetProgramShowCost(payload)
	}, [selectedEntertainment])

	const multipleShows = entertainment?.length > 1

	const toggleBreakdown = () => {
		setIsOpen((prevState: boolean) => !prevState)
	}

	return (
		<tr
			className={`${tableRowClasses} bg-gradient-to-r from-indigo-900/10 to-indigo-800/20 hover:from-indigo-900/20 hover:to-indigo-800/30 transition-colors duration-150 border-b border-indigo-900/30`}
		>
			<td className="w-14 pl-6">
				<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
			</td>
			<td className={`${tableCellClasses} flex items-center space-x-2`}>
				<Icon icon="mdi:music" className="text-indigo-400" width={18} />
				<span className="text-gray-200">Entertainment</span>
			</td>
			<td className={tableCellClasses}>
				{multipleShows ? (
					<OptionSelect
						options={entertainment}
						value={selectedEntertainment?.name || ''}
						handleChange={handleChange}
					/>
				) : (
					<div className="text-gray-300 font-medium">
						{entertainment[0].name}
					</div>
				)}
			</td>
			<td className={tableCellClasses}>
				{selectedEntertainment?.nrArtists && (
					<span className="bg-indigo-800/40 text-indigo-100 font-semibold py-1 px-3 rounded-full text-sm">
						{selectedEntertainment.nrArtists} artists
					</span>
				)}
			</td>
			<td className={tableCellClasses}></td>
			<td className={`${tableCellClasses} font-bold text-lg text-white-0`}>
				{accounting.formatMoney(showsCost || 0, '€')}
			</td>
		</tr>
	)
}
