import { useEffect } from 'react'
import { HotelTotalCost } from '.'
import { OptionSelect } from '../../multipleOrSingle'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { useCurrentProject } from 'src/hooks'

interface HotelSummaryRowProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HotelSummaryRow = ({
	isOpen,
	setIsOpen
}: HotelSummaryRowProps) => {
	const {
		currentProject: { multiDestination = false, hotels = [], schedule },
		budget: { selectedHotel },
		setBudgetSelectedHotel,
		setBudgetSelectedHotelCost,
		updateBudgetMeetingsTotalCost,
		clearMeetingsBudget
	} = useCurrentProject()

	const hotelName = selectedHotel?.name

	useEffect(() => {
		//seteo lo que tiene que ver con meetings cuando cambio de hotel en el selector de Budget
		updateBudgetMeetingsTotalCost(0) // renicio el total de costo de meeetings a 0
		clearMeetingsBudget() // SETEO EL OBJETO DE MEETINGS DE BUDGET
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

	const toggleBreakdown = () => {
		setIsOpen((prevState: boolean) => !prevState)
	}

	return (
		<tr className={tableRowClasses}>
			<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
			<td className={tableCellClasses}>
				{multiDestination ? 'Overnight @' : null}
			</td>
			<td>
				{hotels.length === 1 ? (
					hotelName || hotels[0].name
				) : (
					<OptionSelect
						options={hotels}
						value={hotelName || hotels[0].name}
						handleChange={handleChange}
					/>
				)}
			</td>
			<td></td>
			<td></td>
			<HotelTotalCost />
		</tr>
	)
}
