import accounting from 'accounting'
import React from 'react'
import { useCurrentProject } from 'src/hooks'

export const HotelTotalCost: React.FC = () => {
	const {
		budget: { selectedHotelCost = 0 }
	} = useCurrentProject()

	return <span>{accounting.formatMoney(selectedHotelCost, '€')}</span>
}
