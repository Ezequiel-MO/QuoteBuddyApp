// src/screens/quotation/components/Sidebar/SidebarSection.tsx
import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import Icon from '../common/Icon'

interface SidebarSectionProps {
	title: string
	iconName: string
	onClick: () => void
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
	title,
	iconName,
	onClick
}) => {
	const { activeSection } = useQuotation()
	const currentProject = useQuotation().currentProject || {}

	// Get brand color from project if available
	const clientCompany = currentProject.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const brandColor = colorPalette[0] || '#4a5568'

	// Check if this section is active
	const isActive = activeSection === title.toLowerCase()

	return (
		<button
			onClick={onClick}
			className={`
        w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors duration-200 mb-1
        ${
					isActive
						? 'text-white-0'
						: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
				}
      `}
			style={isActive ? { backgroundColor: brandColor } : {}}
		>
			<Icon name={iconName} className="mr-2" width={18} />
			<span className="text-sm font-medium">{title}</span>
		</button>
	)
}

export default SidebarSection
