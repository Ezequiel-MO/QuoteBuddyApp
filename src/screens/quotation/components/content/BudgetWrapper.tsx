import React, { useRef, useEffect } from 'react'
import { useQuotation } from '../../context/QuotationContext'
import { Icon } from '@iconify/react'
import { BudgetTable } from '@screens/budget/MainTable/higherComponents'

interface BudgetWrapperProps {
	budget?: 'budget' | 'noBudget' | 'budgetAsPdf' | any
}

const BudgetWrapper: React.FC<BudgetWrapperProps> = ({ budget }) => {
	const { currentProject, registerSectionRef } = useQuotation()
	const sectionRef = useRef<HTMLDivElement>(null)
	const breakdownRef = useRef<HTMLDivElement>(null)

	// Register section refs with context
	useEffect(() => {
		registerSectionRef('budget', sectionRef.current)
		registerSectionRef('budget-breakdown', breakdownRef.current)
	}, [registerSectionRef])

	// Get styling information from client company
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color

	// Handle budget status
	if (currentProject.budget === 'noBudget') {
		return (
			<div ref={sectionRef} className="space-y-8">
				<div className="border-b border-gray-200 dark:border-gray-700 pb-4">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0 flex items-center">
						<Icon icon="mdi:currency-usd" className="mr-2" width={24} />
						Budget Estimate
					</h2>
				</div>

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
			</div>
		)
	}

	if (currentProject.budget === 'budgetAsPdf') {
		return (
			<div ref={sectionRef} className="space-y-8">
				<div className="border-b border-gray-200 dark:border-gray-700 pb-4">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0 flex items-center">
						<Icon icon="mdi:currency-usd" className="mr-2" width={24} />
						Budget Estimate
					</h2>
				</div>

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
			</div>
		)
	}

	// Render your actual budget component
	return (
		<div ref={sectionRef} className="space-y-8">
			<div className="border-b border-gray-200 dark:border-gray-700 pb-4">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0 flex items-center">
					<Icon icon="mdi:currency-usd" className="mr-2" width={24} />
					Budget Estimate
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mt-1">
					Financial breakdown for your project
				</p>
			</div>

			{/* Integrate your existing budget component */}
			<div className="bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
				<BudgetTable />
			</div>
		</div>
	)
}

export default BudgetWrapper
