import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import { Icon } from '@iconify/react'

interface SidebarHeaderProps {
	onClose: () => void
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
	const { currentProject } = useQuotation()

	// Get company details for styling
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color

	return (
		<div className="sticky top-0 z-10 bg-white-0 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
			<div className="px-4 py-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center">
						{/* Logo */}
						<div
							className="h-8 w-8 rounded-md flex items-center justify-center mr-3"
							style={{ backgroundColor: primaryColor }}
						>
							<span className="text-white-0 font-bold text-sm">
								{clientCompany.name?.[0] || 'Q'}
							</span>
						</div>

						<div>
							<h2 className="text-base font-bold text-gray-800 dark:text-white-0 truncate">
								Contents
							</h2>
							<p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
								{currentProject?.groupName || 'Project Details'}
							</p>
						</div>
					</div>

					<button
						onClick={onClose}
						className="lg:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
						aria-label="Close sidebar"
					>
						<Icon icon="mdi:close" width={20} />
					</button>
				</div>

				{/* Project Info */}
				<div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
					<div className="flex items-center justify-between mb-1">
						<span className="text-xs font-medium text-gray-600 dark:text-gray-300">
							Project Code:
						</span>
						<span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded font-mono">
							{currentProject?.code || 'N/A'}
						</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-gray-600 dark:text-gray-300">
							Guests:
						</span>
						<span className="text-xs">{currentProject?.nrPax || 0} pax</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-xs font-medium text-gray-600 dark:text-gray-300">
							Duration:
						</span>
						<span className="text-xs">
							{currentProject?.arrivalDay && currentProject?.departureDay
								? calculateDuration(
										currentProject.arrivalDay,
										currentProject.departureDay
								  )
								: 'N/A'}
						</span>
					</div>
				</div>
			</div>

			{/* Search bar */}
			<div className="px-4 pb-3">
				<div className="relative">
					<input
						type="text"
						placeholder="Search in quotation..."
						className="w-full px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:outline-none focus:ring-opacity-50 text-gray-700 dark:text-gray-300"
						style={
							{
								'--tw-ring-color': primaryColor,
								caretColor: primaryColor
							} as React.CSSProperties
						}
					/>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<Icon
							icon="mdi:magnify"
							className="text-gray-500 dark:text-gray-400"
							width={18}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

// Helper function to calculate duration between two dates
function calculateDuration(startDate: string, endDate: string): string {
	try {
		const start = new Date(startDate)
		const end = new Date(endDate)
		const diffTime = Math.abs(end.getTime() - start.getTime())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		return `${diffDays} days`
	} catch (error) {
		return 'N/A'
	}
}

export default SidebarHeader
