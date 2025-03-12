import React from 'react'
import { Icon } from '@iconify/react'
import { transformDates } from '../../utils/dateFormatters'
import { IProject } from '@interfaces/project'

interface OverviewSectionProps {
	projectDetails?: IProject
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
	projectDetails
}) => {
	if (!projectDetails) {
		return (
			<div className="bg-white-0 dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
				<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
				<div className="space-y-4">
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
				</div>
			</div>
		)
	}

	// Get styling information from client company
	const clientCompany = projectDetails.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color

	// Format dates
	const dateRange =
		projectDetails.arrivalDay && projectDetails.departureDay
			? transformDates(projectDetails.arrivalDay, projectDetails.departureDay)
			: 'Date range not specified'

	return (
		<div className="space-y-8">
			{/* Section Heading */}
			<div className="border-b border-gray-200 dark:border-gray-700 pb-4">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0 flex items-center">
					<Icon icon="mdi:information-outline" className="mr-2" width={24} />
					Project Overview
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mt-1">
					Details and highlights for your {projectDetails.groupLocation} project
				</p>
			</div>

			{/* Project Information Card */}
			<div className="bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
				<div className="p-6">
					<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
						{/* Left Column - Basic Info */}
						<div className="flex-1">
							<h3 className="text-xl font-semibold text-gray-800 dark:text-white-0 mb-4">
								{projectDetails.groupName}
							</h3>

							<div className="space-y-3">
								<div className="flex items-start">
									<div className="flex-shrink-0 mt-1">
										<div
											className="p-2 rounded-full"
											style={{ backgroundColor: `${primaryColor}20` }}
										>
											<Icon
												icon="mdi:calendar"
												style={{ color: primaryColor }}
												width={18}
											/>
										</div>
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Dates
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{dateRange}
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex-shrink-0 mt-1">
										<div
											className="p-2 rounded-full"
											style={{ backgroundColor: `${primaryColor}20` }}
										>
											<Icon
												icon="mdi:account-group"
												style={{ color: primaryColor }}
												width={18}
											/>
										</div>
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Group Size
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{projectDetails.nrPax} guests
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex-shrink-0 mt-1">
										<div
											className="p-2 rounded-full"
											style={{ backgroundColor: `${primaryColor}20` }}
										>
											<Icon
												icon="mdi:map-marker"
												style={{ color: primaryColor }}
												width={18}
											/>
										</div>
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Location
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{projectDetails.groupLocation}
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex-shrink-0 mt-1">
										<div
											className="p-2 rounded-full"
											style={{ backgroundColor: `${primaryColor}20` }}
										>
											<Icon
												icon="mdi:currency-usd"
												style={{ color: primaryColor }}
												width={18}
											/>
										</div>
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Budget Estimate
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											€{projectDetails.estimate?.toLocaleString() || 'N/A'}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column - Highlights & Stats */}
						<div className="flex-1">
							<h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
								Project Highlights
							</h4>

							<div className="grid grid-cols-2 gap-4">
								<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
									<div className="flex items-center justify-between">
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Duration
										</p>
										<p className="text-lg font-bold text-gray-800 dark:text-white-0">
											{calculateDuration(
												projectDetails.arrivalDay,
												projectDetails.departureDay
											)}{' '}
											days
										</p>
									</div>
								</div>

								<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
									<div className="flex items-center justify-between">
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Hotels
										</p>
										<p className="text-lg font-bold text-gray-800 dark:text-white-0">
											{projectDetails.hotels?.length || 0}
										</p>
									</div>
								</div>

								<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
									<div className="flex items-center justify-between">
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Meals
										</p>
										<p className="text-lg font-bold text-gray-800 dark:text-white-0">
											{countRestaurants(projectDetails)}
										</p>
									</div>
								</div>

								<div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
									<div className="flex items-center justify-between">
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Activities
										</p>
										<p className="text-lg font-bold text-gray-800 dark:text-white-0">
											{countActivities(projectDetails)}
										</p>
									</div>
								</div>
							</div>

							<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
								<div className="flex justify-between items-center">
									<p className="text-xs text-gray-500 dark:text-gray-400">
										Project Status
									</p>
									<span
										className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
										style={{
											backgroundColor: getStatusColor(
												projectDetails.status || '',
												true
											),
											color: getStatusColor(projectDetails.status || '', false)
										}}
									>
										{projectDetails.status || 'Not Set'}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Project Description */}
			{projectDetails.projectIntro &&
				projectDetails.projectIntro.length > 0 && (
					<div className="bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h3 className="text-xl font-semibold text-gray-800 dark:text-white-0 mb-4">
							Project Description
						</h3>
						<div className="prose dark:prose-invert max-w-none">
							{projectDetails.projectIntro.map((paragraph, index) => (
								<p
									key={index}
									className="mb-4 text-gray-700 dark:text-gray-300"
								>
									{paragraph}
								</p>
							))}
						</div>
					</div>
				)}
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

// Get color based on status
function getStatusColor(status: string, isBackground: boolean): string {
	switch (status.toLowerCase()) {
		case 'received':
			return isBackground ? '#FEF3C7' : '#D97706' // Amber
		case 'sent':
			return isBackground ? '#DBEAFE' : '#2563EB' // Blue
		case 'confirmed':
			return isBackground ? '#D1FAE5' : '#059669' // Green
		case 'cancelled':
			return isBackground ? '#FEE2E2' : '#DC2626' // Red
		case 'invoiced':
			return isBackground ? '#E0E7FF' : '#4F46E5' // Indigo
		default:
			return isBackground ? '#F3F4F6' : '#6B7280' // Gray
	}
}

export default OverviewSection
