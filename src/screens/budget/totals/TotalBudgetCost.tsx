import accounting from 'accounting'
import { usePartialCostsData } from '../partial-costs/usePartialCostsData'
import {
	totalTableRowClasses,
	totaltableCellClasses
} from 'src/constants/listStyles'

export const TotalBudgetCost: React.FC = () => {
	const { totalCostOfItems } = usePartialCostsData()

	return (
		<tr className={totalTableRowClasses}>
			<td colSpan={3} className={`${totaltableCellClasses}`} />
			<td colSpan={2}>
				<strong>{'TOTAL BUDGET'}</strong>
			</td>
			<td>
				<strong>{accounting.formatMoney(totalCostOfItems, '€')}</strong>
			</td>
		</tr>
	)
}
