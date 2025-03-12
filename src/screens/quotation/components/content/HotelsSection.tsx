import React, { useRef, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useQuotation } from '../../context/QuotationContext'
import { IHotel } from 'src/interfaces'
import HotelCard from './HotelCard'

interface HotelsSectionProps {
	hotels: IHotel[]
}

const HotelsSection: React.FC<HotelsSectionProps> = ({ hotels }) => {
	const { currentProject, registerSectionRef } = useQuotation()
	const [activeHotel, setActiveHotel] = useState<string | null>(null)
	const [view, setView] = useState<'grid' | 'list'>('grid')
	const sectionRef = useRef<HTMLDivElement>(null)

	// Get styling information from client company
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color

	// Register section ref with context
	useEffect(() => {
		registerSectionRef('accommodation', sectionRef.current)
	}, [registerSectionRef])

	// Toggle active hotel
	const toggleHotel = (hotelId: string) => {
		setActiveHotel((prev) => (prev === hotelId ? null : hotelId))
	}

	return (
		<div ref={sectionRef} className="space-y-8">
			{/* Section Heading */}
			<div className="border-b border-gray-200 dark:border-gray-700 pb-4">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0 flex items-center">
					<Icon icon="mdi:bed-outline" className="mr-2" width={24} />
					Accommodation
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mt-1">
					{hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'} selected
					for your stay
				</p>
			</div>

			{/* Controls */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white-0 dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<div className="inline-flex rounded-md shadow-sm">
						<button
							onClick={() => setView('grid')}
							className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
								view === 'grid'
									? 'text-white-0'
									: 'text-gray-700 dark:text-gray-300 bg-white-0 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							}`}
							style={{
								backgroundColor: view === 'grid' ? primaryColor : undefined
							}}
						>
							<Icon icon="mdi:view-grid" className="mr-1" width={16} />
							Grid
						</button>
						<button
							onClick={() => setView('list')}
							className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
								view === 'list'
									? 'text-white-0'
									: 'text-gray-700 dark:text-gray-300 bg-white-0 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							}`}
							style={{
								backgroundColor: view === 'list' ? primaryColor : undefined
							}}
						>
							<Icon icon="mdi:view-list" className="mr-1" width={16} />
							List
						</button>
					</div>

					<div className="text-sm text-gray-500 dark:text-gray-400">
						{hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'}
					</div>
				</div>

				<div className="relative">
					<input
						type="text"
						placeholder="Search hotels..."
						className="w-full px-4 py-2 pl-10 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:outline-none focus:ring-opacity-50"
						style={{
							caretColor: primaryColor
						}}
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

			{/* Hotels Content */}
			{hotels.length === 0 ? (
				<div className="bg-white-0 dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
					<Icon
						icon="mdi:hotel"
						className="mx-auto text-gray-400 dark:text-gray-500"
						width={48}
					/>
					<h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white-0">
						No Hotels Selected
					</h3>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						No accommodation has been selected for this project yet.
					</p>
				</div>
			) : (
				<div
					className={
						view === 'grid'
							? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
							: 'space-y-6'
					}
				>
					{hotels.map((hotel) => (
						<HotelCard
							key={hotel._id}
							hotel={hotel}
							isExpanded={activeHotel === hotel._id}
							onToggle={() => toggleHotel(hotel._id || '')}
							view={view}
							accentColor={primaryColor}
						/>
					))}
				</div>
			)}

			{/* Selected Hotels Summary */}
			{hotels.length > 0 && (
				<div className="bg-white-0 dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-8">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white-0 mb-4">
						Accommodation Summary
					</h3>

					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
									>
										Hotel
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
									>
										City
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
									>
										Rating
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
									>
										Room Count
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
									>
										Check-in/out
									</th>
								</tr>
							</thead>
							<tbody className="bg-white-0 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
								{hotels.map((hotel) => (
									<tr
										key={hotel._id}
										className="hover:bg-gray-50 dark:hover:bg-gray-700"
									>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white-0">
											{hotel.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{hotel.city}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{renderStars(hotel.numberStars)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{hotel.numberRooms}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{hotel.checkin_out}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	)
}

// Helper function to render star rating
const renderStars = (count: number) => {
	return (
		<div className="flex items-center">
			{Array.from({ length: 5 }).map((_, i) => (
				<Icon
					key={i}
					icon={i < count ? 'mdi:star' : 'mdi:star-outline'}
					className={
						i < count ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
					}
					width={16}
				/>
			))}
		</div>
	)
}

export default HotelsSection
