import React, { useState } from 'react'
import { useQuotation } from '../../context/QuotationContext'
import { transformDates } from '../../utils/dateFormatters'
import { Icon } from '@iconify/react'
import OverviewTable from './OverviewTable'

const ProjectOverview: React.FC = () => {
	const { currentProject, scrollToSection } = useQuotation()
	const [activeTab, setActiveTab] = useState<'schedule' | 'details'>('schedule')

	if (!currentProject) {
		return (
			<div className="p-4 text-center text-gray-500 dark:text-gray-400">
				Loading project details...
			</div>
		)
	}

	// Get company details for styling
	const clientCompany = currentProject.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color

	// Format dates
	const dateRange =
		currentProject.arrivalDay && currentProject.departureDay
			? transformDates(currentProject.arrivalDay, currentProject.departureDay)
			: 'Date range not specified'

	// Helper for tab button styling
	const getTabStyle = (tab: 'schedule' | 'details') => ({
		backgroundColor: activeTab === tab ? primaryColor : 'transparent',
		color: activeTab === tab ? 'white' : undefined,
		borderColor: activeTab === tab ? primaryColor : undefined
	})

	return (
		<div className="bg-white-0 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out">
			{/* Project Summary */}
			<div className="p-5 border-b border-gray-200 dark:border-gray-700">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0 mb-2">
							{currentProject.groupName}
						</h2>
						<p className="text-gray-600 dark:text-gray-300 flex items-center mb-1">
							<Icon icon="mdi:calendar" className="mr-2" width={18} />
							{dateRange}
						</p>
						<p className="text-gray-600 dark:text-gray-300 flex items-center mb-1">
							<Icon icon="mdi:account-group" className="mr-2" width={18} />
							{currentProject.nrPax} guests
						</p>
						<p className="text-gray-600 dark:text-gray-300 flex items-center">
							<Icon icon="mdi:map-marker" className="mr-2" width={18} />
							{currentProject.groupLocation}
						</p>
					</div>

					<div className="mt-4 md:mt-0">
						<div className="flex items-center space-x-2">
							<button
								className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
								onClick={() => scrollToSection('budget')}
							>
								<span className="flex items-center">
									<Icon icon="mdi:currency-usd" className="mr-1" width={16} />
									View Budget
								</span>
							</button>

							<button
								className="px-4 py-2 text-sm rounded-md text-white-0 hover:bg-opacity-90 transition-colors"
								style={{ backgroundColor: primaryColor }}
								onClick={() => {} /*download or contact action*/}
							>
								<span className="flex items-center">
									<Icon icon="mdi:download" className="mr-1" width={16} />
									Download PDF
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Tab Navigation */}
			<div className="border-b border-gray-200 dark:border-gray-700 px-5 pt-4">
				<div className="flex space-x-4">
					<button
						className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
							activeTab === 'schedule'
								? 'text-white-0 border-transparent'
								: 'text-gray-600 dark:text-gray-300 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
						}`}
						style={getTabStyle('schedule')}
						onClick={() => setActiveTab('schedule')}
					>
						Schedule Overview
					</button>

					<button
						className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
							activeTab === 'details'
								? 'text-white-0 border-transparent'
								: 'text-gray-600 dark:text-gray-300 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
						}`}
						style={getTabStyle('details')}
						onClick={() => setActiveTab('details')}
					>
						Project Details
					</button>
				</div>
			</div>

			{/* Tab Content */}
			<div className="p-5">
				{activeTab === 'schedule' ? (
					<OverviewTable />
				) : (
					<div className="prose dark:prose-invert max-w-none">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-white-0 mb-3">
									Project Details
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
										<span className="font-medium text-gray-600 dark:text-gray-300">
											Project Code
										</span>
										<span className="text-gray-800 dark:text-white-0">
											{currentProject.code}
										</span>
									</div>
									<div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
										<span className="font-medium text-gray-600 dark:text-gray-300">
											Status
										</span>
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
											{currentProject.status}
										</span>
									</div>
									<div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
										<span className="font-medium text-gray-600 dark:text-gray-300">
											Client
										</span>
										<span className="text-gray-800 dark:text-white-0">
											{clientCompany.name || 'N/A'}
										</span>
									</div>
									<div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
										<span className="font-medium text-gray-600 dark:text-gray-300">
											Duration
										</span>
										<span className="text-gray-800 dark:text-white-0">
											{calculateDuration(
												currentProject.arrivalDay,
												currentProject.departureDay
											)}{' '}
											days
										</span>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-800 dark:text-white-0 mb-3">
									Main Highlights
								</h3>
								<div className="space-y-2">
									<div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
										<span className="font-medium text-gray-600 dark:text-gray-300">
											Hotels
										</span>
										<span className="text-gray-800 dark:text-white-0">
											{currentProject.hotels?.length || 0}
										</span>
									</div>
									<div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
										<span className="font-medium text-gray-600 dark:text-gray-300">
											Activities
										</span>
										<span className="text-gray-800 dark:text-white-0">
											{countActivities(currentProject)}
										</span>
									</div>
									<div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
										<span className="font-medium text-gray-600 dark:text-gray-300">
											Restaurants
										</span>
										<span className="text-gray-800 dark:text-white-0">
											{countRestaurants(currentProject)}
										</span>
									</div>
									<div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
										<span className="font-medium text-gray-600 dark:text-gray-300">
											Budget Estimate
										</span>
										<span className="text-gray-800 dark:text-white-0">
											€{currentProject.estimate?.toLocaleString() || 'N/A'}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Project Intro */}
						{currentProject.projectIntro &&
							currentProject.projectIntro.length > 0 && (
								<div className="mt-6">
									<h3 className="text-lg font-semibold text-gray-800 dark:text-white-0 mb-3">
										Project Introduction
									</h3>
									<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
										{currentProject.projectIntro.map((paragraph, index) => (
											<p
												key={index}
												className="mb-2 text-gray-700 dark:text-gray-300"
											>
												{paragraph}
											</p>
										))}
									</div>
								</div>
							)}
					</div>
				)}
			</div>
		</div>
	)
}

// Helper function to calculate duration
function calculateDuration(startDate?: string, endDate?: string): number {
	if (!startDate || !endDate) return 0

	try {
		const start = new Date(startDate)
		const end = new Date(endDate)
		const diffTime = Math.abs(end.getTime() - start.getTime())
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
	} catch (error) {
		return 0
	}
}

// Helper function to count activities
function countActivities(project: any): number {
	let count = 0

	if (project.schedule && Array.isArray(project.schedule)) {
		project.schedule.forEach((day: any) => {
			count += day.morningEvents?.events?.length || 0
			count += day.afternoonEvents?.events?.length || 0
		})
	}

	return count
}

// Helper function to count restaurants
function countRestaurants(project: any): number {
	let count = 0

	if (project.schedule && Array.isArray(project.schedule)) {
		project.schedule.forEach((day: any) => {
			count += day.lunch?.restaurants?.length || 0
			count += day.dinner?.restaurants?.length || 0
		})
	}

	return count
}

export default ProjectOverview
