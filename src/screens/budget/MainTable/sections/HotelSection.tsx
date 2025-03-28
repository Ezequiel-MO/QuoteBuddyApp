import { useState, useEffect } from 'react'
import { HotelSummaryRow, HotelBreakdownRows } from '../rows/hotel'
import { useCurrentProject } from 'src/hooks'
import { SectionHeader } from '../sections/SectionHeader'

export const HotelSection = () => {
	const {
		currentProject: { hotels = [] },
		setBudgetSelectedHotel,
		setBudgetSelectedHotelCost
	} = useCurrentProject()

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedHotel, setSelectedHotel] = useState(hotels[0])

	useEffect(() => {
		if (hotels.length > 0 && selectedHotel) {
			setBudgetSelectedHotel(selectedHotel)
			setBudgetSelectedHotelCost(selectedHotel, 1) // Assuming 1 night by default
		}
	}, [hotels, selectedHotel])

	if (!hotels.length) {
		return null
	}

	return (
		<>
			{/* Section Header */}
			<SectionHeader title="Accommodation" type="accommodation" />

			{/* Hotel Rows */}
			<HotelSummaryRow isOpen={isOpen} setIsOpen={setIsOpen} />
			<HotelBreakdownRows isOpen={isOpen} />
		</>
	)
}
