import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import CollapsibleSection from '../common/CollapsibleSection'

interface BudgetSectionProps {
	isExpanded: boolean
	onToggle: () => void
	accentColor?: string
}

const BudgetSection: React.FC<BudgetSectionProps> = ({
	isExpanded,
	onToggle,
	accentColor = '#4F46E5'
}) => {
	const { scrollToSection } = useQuotation()

	return (
		<CollapsibleSection
			title="Budget"
			icon="mdi:currency-usd"
			isExpanded={isExpanded}
			onToggle={onToggle}
			accentColor={accentColor}
		>
			<div className="space-y-1">
				<button
					onClick={() => scrollToSection('budget')}
					className="w-full text-left p-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					Budget Overview
				</button>
				<button
					onClick={() => scrollToSection('budget-breakdown')}
					className="w-full text-left p-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					Detailed Breakdown
				</button>
			</div>
		</CollapsibleSection>
	)
}

export default BudgetSection
