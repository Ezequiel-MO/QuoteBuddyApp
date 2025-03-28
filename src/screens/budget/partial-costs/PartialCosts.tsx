import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { ICostItem, usePartialCostsData } from './usePartialCostsData'
import { CostItem } from './CostItem'
import { TranslationKeys } from '@interfaces/translations'
import accounting from 'accounting'
import { Icon } from '@iconify/react'

interface PartialCostsProps {
	colorPalette?: string[]
}

export const PartialCosts: React.FC<PartialCostsProps> = ({
	colorPalette = []
}: PartialCostsProps) => {
	const { data, costItems, totalCostOfItems } = usePartialCostsData()

	ChartJS.register(ArcElement, Tooltip, Legend)

	const iconColor = colorPalette.length > 0 ? colorPalette[2] : '#ea5933'

	return (
		<div className="mx-4 overflow-hidden rounded-xl shadow-2xl border border-gray-700/60 bg-gradient-to-b from-gray-800 to-gray-900 p-6 mb-8">
			<div className="flex items-center mb-4 pb-3 border-b border-gray-700/40">
				<Icon icon="carbon:chart-pie" className="w-6 h-6 text-blue-400 mr-3" />
				<h2 className="text-xl font-semibold text-white-0 tracking-wide">
					Budget Breakdown
				</h2>
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				{/* Cost Items List */}
				<div className="w-full md:w-2/3 space-y-2 relative">
					{costItems
						?.filter((item) => item?.cost !== 0)
						.map((item: ICostItem) => (
							<CostItem
								key={item.title}
								icon={item.icon}
								title={item.title as TranslationKeys}
								cost={item.cost || 0}
								color={item.color || iconColor}
								bgColor={item.bgColor}
							/>
						))}

					{/* Total */}
					<div className="mt-4 pt-4 border-t border-gray-700/40">
						<div className="flex items-center justify-between px-4 py-3 rounded-md bg-gradient-to-r from-blue-900/40 to-blue-800/40 shadow-lg border border-blue-700/40">
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
								<strong className="text-xl font-extrabold text-white-0 tracking-wider">
									TOTAL BUDGET
								</strong>
							</div>
							<div className="text-2xl font-bold text-white-0 tracking-wider bg-green-800/30 px-4 py-2 rounded-lg ring-2 ring-green-500/30">
								{accounting.formatMoney(totalCostOfItems, '€')}
							</div>
						</div>
					</div>
				</div>

				{/* Chart */}
				<div className="w-full md:w-1/3 flex justify-center items-center bg-gray-800/50 p-4 rounded-lg shadow-inner border border-gray-700/30">
					<div className="w-full max-w-xs relative flex justify-center items-center">
						<Doughnut
							data={data}
							options={{
								plugins: {
									legend: { display: false },
									tooltip: {
										backgroundColor: 'rgba(15, 23, 42, 0.8)',
										titleFont: { size: 14, weight: 'bold' },
										bodyFont: { size: 12 },
										padding: 12,
										cornerRadius: 6,
										displayColors: true,
										boxWidth: 10,
										boxHeight: 10,
										boxPadding: 3
									}
								},
								cutout: '65%',
								animation: {
									animateScale: true,
									animateRotate: true
								}
							}}
							className="drop-shadow-xl"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center">
								<span className="block text-gray-400 text-xs font-medium">
									TOTAL
								</span>
								<span className="block text-white-0 text-lg font-bold">
									{accounting.formatMoney(totalCostOfItems, '€')}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
