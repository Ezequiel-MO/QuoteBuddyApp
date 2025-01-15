import { useEffect, useState, useMemo, useRef } from 'react'
import { HotelSummaryRow, HotelBreakdownRows } from '.'
import { useCurrentProject } from 'src/hooks'
import { IHotel } from '@interfaces/hotel'

export const HotelRows = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const {
		currentProject: { hotels = [] },
		setBudgetSelectedHotel,
		setBudgetSelectedHotelCost
	} = useCurrentProject()

	const firstHotel = useMemo(() => hotels[0] || null, [hotels])
	const prevFirstHotelRef = useRef<IHotel | null>(null)

	useEffect(() => {
		if (!prevFirstHotelRef.current && firstHotel) {
			setBudgetSelectedHotel(firstHotel)
			prevFirstHotelRef.current = firstHotel
		}
	}, [
		firstHotel,
		hotels.length,
		setBudgetSelectedHotel,
		setBudgetSelectedHotelCost
	])

	if (!hotels.length) {
		return null
	}

	return (
		<>
			<HotelSummaryRow isOpen={isOpen} setIsOpen={setIsOpen} />
			<HotelBreakdownRows isOpen={isOpen} />
		</>
	)
}
