// Path: src/screens/budget/totals/TotalBudgetCost.tsx
import React from 'react'
import accounting from 'accounting'
import { usePartialCostsData } from '../partial-costs/usePartialCostsData'

export const TotalBudgetCost: React.FC = () => {
	const { totalCostOfItems } = usePartialCostsData()

	return (
		<tr className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-t-2 border-blue-700 shadow-lg">
			<td colSpan={3} className="py-6 px-4" />
			<td colSpan={2} className="py-6 px-6">
				<div className="flex items-center space-x-3">
					<svg
						className="w-7 h-7 text-green-400 animate-pulse"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95a1 1 0 001.715 1.029zM6.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-.879 2.122a.75.75 0 00-1.06 1.06l2.122 2.122 4.243-4.243a.75.75 0 00-1.06-1.06l-3.182 3.182-1.061-1.061z"
							clipRule="evenodd"
						/>
					</svg>
					<strong className="text-2xl font-extrabold text-white-0 tracking-wider">
						TOTAL BUDGET
					</strong>
				</div>
			</td>
			<td className="py-6 px-6">
				<div className="text-2xl font-bold text-white-0 tracking-wider bg-green-800/30 px-4 py-2 rounded-lg ring-2 ring-green-500/30">
					{accounting.formatMoney(totalCostOfItems, '€')}
				</div>
			</td>
		</tr>
	)
}
