import React, { useRef, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useQuotation } from '../../context/QuotationContext'

interface BudgetSectionProps {
	budget?: 'budget' | 'noBudget' | 'budgetAsPdf' | any
}

const BudgetSection: React.FC<BudgetSectionProps> = ({ budget }) => {
	const { currentProject, registerSectionRef } = useQuotation()
	const [activeTab, setActiveTab] = useState<'overview' | 'breakdown'>(
		'overview'
	)
	const sectionRef = useRef<HTMLDivElement>(null)
	const breakdownRef = useRef<HTMLDivElement>(null)

	// Get styling information from client company
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color

	// Register section refs with context
	useEffect(() => {
		registerSectionRef('budget', sectionRef.current)
		registerSectionRef('budget-breakdown', breakdownRef.current)
	}, [registerSectionRef])

	// Get budget data from current project
	const projectBudget = currentProject?.budget

	// Create example budget data if none exists
	const budgetData = {
		accommodation: 12500,
		meals: 8750,
		activities: 6200,
		transfers: 3450,
		meetings: 5800,
		gifts: 1200,
		entertainment: 2800,
		staffing: 4500,
		miscellaneous: 1800
	}

	const totalBudget = Object.values(budgetData).reduce(
		(sum, value) => sum + value,
		0
	)

	// Helper function to calculate percentage of total
	const calculatePercentage = (value: number) => {
		return ((value / totalBudget) * 100).toFixed(1)
	}

	// Helper function to format currency
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value)
	}

	// Handle tab switch
	const handleTabChange = (tab: 'overview' | 'breakdown') => {
		setActiveTab(tab)
	}

	return (
		<div ref={sectionRef} className="space-y-8">
			{/* Section Heading */}
			<div className="border-b border-gray-200 dark:border-gray-700 pb-4">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0 flex items-center">
					<Icon icon="mdi:currency-usd" className="mr-2" width={24} />
					Budget Estimate
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mt-1">
					Total budget: {formatCurrency(totalBudget)}
				</p>
			</div>

			{/* Budget Status */}
			{projectBudget === 'noBudget' ? (
				<div className="bg-white-0 dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
					<Icon
						icon="mdi:cash-remove"
						className="mx-auto text-gray-400 dark:text-gray-500"
						width={48}
					/>
					<h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white-0">
						Budget Not Available
					</h3>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						The budget breakdown for this project is not available.
					</p>
				</div>
			) : projectBudget === 'budgetAsPdf' ? (
				<div className="bg-white-0 dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex flex-col items-center">
						<Icon icon="mdi:file-pdf-box" className="text-red-500" width={64} />
						<h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white-0">
							Budget Available as PDF
						</h3>
						<p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-md">
							The budget for this project is available as a PDF document.
						</p>
						<button
							className="mt-4 px-6 py-2 rounded-lg text-white-0 flex items-center font-medium transition-colors"
							style={{ backgroundColor: primaryColor }}
						>
							<Icon icon="mdi:download" className="mr-2" width={18} />
							Download Budget PDF
						</button>
					</div>
				</div>
			) : (
				<>
					{/* Tab Navigation */}
					<div className="border-b border-gray-200 dark:border-gray-700">
						<div className="flex space-x-4">
							<button
								className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
									activeTab === 'overview'
										? 'border-current text-gray-800 dark:text-white-0'
										: 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
								}`}
								style={{
									borderColor:
										activeTab === 'overview' ? primaryColor : undefined,
									color: activeTab === 'overview' ? primaryColor : undefined
								}}
								onClick={() => handleTabChange('overview')}
							>
								Budget Overview
							</button>

							<button
								className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
									activeTab === 'breakdown'
										? 'border-current text-gray-800 dark:text-white-0'
										: 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
								}`}
								style={{
									borderColor:
										activeTab === 'breakdown' ? primaryColor : undefined,
									color: activeTab === 'breakdown' ? primaryColor : undefined
								}}
								onClick={() => handleTabChange('breakdown')}
							>
								Detailed Breakdown
							</button>
						</div>
					</div>

					{/* Budget Content */}
					<div>
						{activeTab === 'overview' ? (
							<div className="bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
								<h3 className="text-lg font-semibold text-gray-800 dark:text-white-0 mb-6">
									Budget Overview
								</h3>

								<div className="space-y-6">
									{/* Visual Budget Chart */}
									<div className="mb-8">
										<div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex">
											{Object.entries(budgetData).map(
												([category, value], index) => {
													const percentage = parseFloat(
														calculatePercentage(value)
													)
													const colors = [
														'bg-blue-500 dark:bg-blue-600',
														'bg-emerald-500 dark:bg-emerald-600',
														'bg-amber-500 dark:bg-amber-600',
														'bg-rose-500 dark:bg-rose-600',
														'bg-violet-500 dark:bg-violet-600',
														'bg-cyan-500 dark:bg-cyan-600',
														'bg-fuchsia-500 dark:bg-fuchsia-600',
														'bg-lime-500 dark:bg-lime-600',
														'bg-orange-500 dark:bg-orange-600'
													]

													return (
														<div
															key={category}
															className={`h-full ${
																colors[index % colors.length]
															}`}
															style={{ width: `${percentage}%` }}
															title={`${category}: ${formatCurrency(
																value
															)} (${percentage}%)`}
														></div>
													)
												}
											)}
										</div>

										{/* Legend */}
										<div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
											{Object.entries(budgetData).map(
												([category, value], index) => {
													const colors = [
														'bg-blue-500 dark:bg-blue-600',
														'bg-emerald-500 dark:bg-emerald-600',
														'bg-amber-500 dark:bg-amber-600',
														'bg-rose-500 dark:bg-rose-600',
														'bg-violet-500 dark:bg-violet-600',
														'bg-cyan-500 dark:bg-cyan-600',
														'bg-fuchsia-500 dark:bg-fuchsia-600',
														'bg-lime-500 dark:bg-lime-600',
														'bg-orange-500 dark:bg-orange-600'
													]

													return (
														<div key={category} className="flex items-center">
															<div
																className={`w-4 h-4 ${
																	colors[index % colors.length]
																} rounded-sm mr-2 flex-shrink-0`}
															></div>
															<div className="flex-1 min-w-0">
																<p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
																	{category}
																</p>
																<div className="flex justify-between">
																	<span className="text-xs text-gray-500 dark:text-gray-400">
																		{calculatePercentage(value)}%
																	</span>
																	<span className="text-xs font-medium text-gray-700 dark:text-gray-300">
																		{formatCurrency(value)}
																	</span>
																</div>
															</div>
														</div>
													)
												}
											)}
										</div>
									</div>

									{/* Summary Table */}
									<div>
										<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
											Budget Summary
										</h4>
										<div className="overflow-x-auto">
											<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
												<thead className="bg-gray-50 dark:bg-gray-700">
													<tr>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Category
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Amount
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Percentage
														</th>
													</tr>
												</thead>
												<tbody className="bg-white-0 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
													{Object.entries(budgetData).map(
														([category, value]) => (
															<tr
																key={category}
																className="hover:bg-gray-50 dark:hover:bg-gray-700"
															>
																<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white-0 capitalize">
																	{category}
																</td>
																<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
																	{formatCurrency(value)}
																</td>
																<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
																	{calculatePercentage(value)}%
																</td>
															</tr>
														)
													)}
													<tr className="bg-gray-50 dark:bg-gray-700">
														<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white-0">
															Total
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white-0">
															{formatCurrency(totalBudget)}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white-0">
															100%
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div
								ref={breakdownRef}
								className="bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
							>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-white-0 mb-6">
									Detailed Budget Breakdown
								</h3>

								{/* Detailed categories */}
								<div className="space-y-8">
									{/* Accommodation */}
									<div>
										<h4 className="flex items-center text-md font-semibold text-gray-800 dark:text-white-0 mb-3">
											<Icon
												icon="mdi:bed-outline"
												className="mr-2"
												width={20}
											/>
											Accommodation
										</h4>
										<div className="overflow-x-auto">
											<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
												<thead className="bg-gray-50 dark:bg-gray-700">
													<tr>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Hotel
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Room Type
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Nights
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Units
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Rate
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Total
														</th>
													</tr>
												</thead>
												<tbody className="bg-white-0 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
													{/* Example hotel rows */}
													<tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
														<td className="px-4 py-3 text-sm text-gray-900 dark:text-white-0">
															Grand Hotel
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															Single (DUI)
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															3
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															25
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															€150
														</td>
														<td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white-0">
															€11,250
														</td>
													</tr>
													<tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
														<td className="px-4 py-3 text-sm text-gray-900 dark:text-white-0">
															Grand Hotel
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															Breakfast
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															3
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															25
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															€15
														</td>
														<td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white-0">
															€1,125
														</td>
													</tr>
													<tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
														<td className="px-4 py-3 text-sm text-gray-900 dark:text-white-0">
															Grand Hotel
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															City Tax
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															3
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															25
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															€2
														</td>
														<td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white-0">
															€150
														</td>
													</tr>
													<tr className="bg-blue-50 dark:bg-blue-900/20">
														<td
															colSpan={5}
															className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white-0"
														>
															Accommodation Subtotal
														</td>
														<td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white-0">
															€12,525
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									{/* Meals */}
									<div>
										<h4 className="flex items-center text-md font-semibold text-gray-800 dark:text-white-0 mb-3">
											<Icon icon="mdi:food" className="mr-2" width={20} />
											Meals
										</h4>
										<div className="overflow-x-auto">
											<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
												<thead className="bg-gray-50 dark:bg-gray-700">
													<tr>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Restaurant
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Meal Type
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Date
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Guests
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Cost/Person
														</th>
														<th
															scope="col"
															className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
														>
															Total
														</th>
													</tr>
												</thead>
												<tbody className="bg-white-0 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
													<tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
														<td className="px-4 py-3 text-sm text-gray-900 dark:text-white-0">
															Seaside Restaurant
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															Lunch
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															Day 1
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															25
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															€35
														</td>
														<td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white-0">
															€875
														</td>
													</tr>
													<tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
														<td className="px-4 py-3 text-sm text-gray-900 dark:text-white-0">
															City Grill
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															Dinner
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															Day 1
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															25
														</td>
														<td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
															€60
														</td>
														<td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white-0">
															€1,500
														</td>
													</tr>
													<tr className="bg-amber-50 dark:bg-amber-900/20">
														<td
															colSpan={5}
															className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white-0"
														>
															Meals Subtotal
														</td>
														<td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white-0">
															€8,750
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									{/* More categories would follow... */}

									{/* Total */}
									<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
										<div className="flex justify-between items-center">
											<h3 className="text-lg font-bold text-gray-900 dark:text-white-0">
												Total Budget
											</h3>
											<span
												className="text-xl font-bold"
												style={{ color: primaryColor }}
											>
												{formatCurrency(totalBudget)}
											</span>
										</div>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											Price per person: {formatCurrency(totalBudget / 25)}
										</p>
									</div>

									{/* Budget Notes */}
									<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
										<h4 className="font-medium text-gray-800 dark:text-white-0 mb-2">
											Budget Notes
										</h4>
										<ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
											<li>All prices include VAT and local taxes</li>
											<li>
												Budget is subject to change based on final guest count
												and selections
											</li>
											<li>Exchange rates may affect final pricing</li>
											<li>
												Additional expenses may apply for special requests
											</li>
										</ul>
									</div>
								</div>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default BudgetSection
