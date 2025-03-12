// src/screens/quotation/components/Sidebar/BudgetSection.tsx
import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import CollapsibleSection from '../common/CollapsibleSection'

interface BudgetSectionProps {
	isExpanded: boolean
	onToggle: () => void
}

const BudgetSection: React.FC<BudgetSectionProps> = ({
	isExpanded,
	onToggle
}) => {
	const { scrollToSection } = useQuotation()

	return (
		<CollapsibleSection
			title="Budget"
			iconName="coin"
			isExpanded={isExpanded}
			onToggle={onToggle}
		>
			<div className="space-y-1">
				<button
					onClick={() => scrollToSection('budget')}
					className="w-full text-left p-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					Overview
				</button>
				<button
					onClick={() => scrollToSection('budget-breakdown')}
					className="w-full text-left p-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					Detailed Breakdown
				</button>
			</div>
		</CollapsibleSection>
	)
}

export default BudgetSection
