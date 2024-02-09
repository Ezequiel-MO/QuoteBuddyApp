import { useEffect } from 'react'
import accounting from 'accounting'
import { IEntertainment } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import { UPDATE_PROGRAM_SHOWS_COST } from '../../../context/budgetReducer'
import { OptionSelect } from '../../multipleOrSingle'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'

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
	const { state, dispatch } = useContextBudget()

	useEffect(() => {
		dispatch({
			type: UPDATE_PROGRAM_SHOWS_COST,
			payload: {
				date,
				show: selectedEntertainment,
				type: typeOfEvent
			}
		})
	}, [selectedEntertainment, dispatch])

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
				<td>{accounting.formatMoney(state.showsCost || 0, '€')}</td>
			</tr>
		</>
	)
}
