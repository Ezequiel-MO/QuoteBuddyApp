import accounting from 'accounting'
import { useCurrentProject } from 'src/hooks'

export const HotelTotalCost = () => {
	const {
		budget: { selectedHotelCost = 0 }
	} = useCurrentProject()

	return <td>{accounting.formatMoney(selectedHotelCost, '€')}</td>
}
