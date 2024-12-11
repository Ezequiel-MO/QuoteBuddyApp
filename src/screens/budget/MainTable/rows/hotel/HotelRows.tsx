import { useEffect, useState } from 'react'
import { HotelSummaryRow, HotelBreakdownRows } from '.'
import { useCurrentProject } from 'src/hooks'

export const HotelRows = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const {
		currentProject: { hotels = [] },
		setBudgetSelectedHotel
	} = useCurrentProject()

	useEffect(() => {
		if (hotels.length > 0) {
			setBudgetSelectedHotel(hotels[0])
		}
	}, [hotels])

	return (
		<>
			{Array.isArray(hotels) && hotels.length > 0 ? (
				<>
					<HotelSummaryRow isOpen={isOpen} setIsOpen={setIsOpen} />
					<HotelBreakdownRows isOpen={isOpen} />
				</>
			) : null}
		</>
	)
}
