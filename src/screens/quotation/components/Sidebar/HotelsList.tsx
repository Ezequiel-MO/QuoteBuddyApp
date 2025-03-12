import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import CollapsibleSection from '../common/CollapsibleSection'

interface HotelsListProps {
	isExpanded: boolean
	onToggle: () => void
}

const HotelsList: React.FC<HotelsListProps> = ({ isExpanded, onToggle }) => {
	const { currentProject, scrollToSection } = useQuotation()
	const hotels = currentProject?.hotels || []

	// Don't render if no hotels
	if (!hotels || hotels.length === 0) {
		return null
	}

	return (
		<CollapsibleSection
			title="Hotels"
			iconName="hotel"
			isExpanded={isExpanded}
			onToggle={onToggle}
		>
			<div className="space-y-1">
				{hotels.map((hotel, index) => (
					<button
						key={`hotel-${index}`}
						onClick={() => scrollToSection('accommodation')}
						className="w-full text-left p-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						{hotel.name}
					</button>
				))}
			</div>
		</CollapsibleSection>
	)
}

export default HotelsList
