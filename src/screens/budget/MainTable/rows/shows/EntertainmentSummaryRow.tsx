import { useEffect } from 'react'
import accounting from 'accounting'
import { IEntertainment } from '../../../../../interfaces'
import { OptionSelect } from '../../multipleOrSingle'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { useCurrentProject } from 'src/hooks'
import { UpdateProgramShowsCostPayload } from 'src/redux/features/currentProject/types'

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
		<>
			<tr className={tableRowClasses}>
				<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
				<td className={tableCellClasses}>Entertainment</td>
				<td>
					{multipleShows ? (
						<OptionSelect
							options={entertainment}
							value={selectedEntertainment?.name || ''}
							handleChange={handleChange}
						/>
					) : (
						<>{entertainment[0].name}</>
					)}
				</td>

				<td></td>
				<td></td>
				<td>{accounting.formatMoney(showsCost || 0, '€')}</td>
			</tr>
		</>
	)
}
