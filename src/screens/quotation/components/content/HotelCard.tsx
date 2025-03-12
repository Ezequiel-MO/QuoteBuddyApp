import React from 'react'
import { Icon } from '@iconify/react'
import { IHotel } from '@interfaces/hotel'

interface HotelCardProps {
	hotel: IHotel
	isExpanded: boolean
	onToggle: () => void
	view: 'grid' | 'list'
	accentColor?: string
}

const HotelCard: React.FC<HotelCardProps> = ({
	hotel,
	isExpanded,
	onToggle,
	view,
	accentColor = '#4F46E5'
}) => {
	// Determine default image
	const defaultImage =
		hotel.imageContentUrl && hotel.imageContentUrl.length > 0
			? hotel.imageContentUrl[0]
			: 'https://via.placeholder.com/300x200?text=No+Image'

	// Hotel features
	const features = [
		{
			name: 'City',
			value: hotel.city,
			icon: 'mdi:map-marker-outline'
		},
		{
			name: 'Rooms',
			value: hotel.numberRooms.toString(),
			icon: 'mdi:door'
		},
		{
			name: 'Check In/Out',
			value: hotel.checkin_out,
			icon: 'mdi:clock-outline'
		},
		{
			name: 'WiFi',
			value: hotel.wifiSpeed,
			icon: 'mdi:wifi'
		},
		{
			name: 'Swimming Pool',
			value: hotel.swimmingPool,
			icon: 'mdi:pool'
		},
		{
			name: 'Restaurants',
			value: hotel.restaurants,
			icon: 'mdi:food'
		},
		{
			name: 'Wheelchair Accessible',
			value: hotel.wheelChairAccessible ? 'Yes' : 'No',
			icon: 'mdi:wheelchair-accessibility'
		},
		{
			name: 'Meeting Rooms',
			value: hotel.meetingRooms.toString(),
			icon: 'mdi:account-group'
		}
	]

	// Render hotel rating stars
	const renderStars = (count: number) => {
		return (
			<div className="flex">
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

	return (
		<div
			className={`
        bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden
        transition-all duration-300 hover:shadow-md
        ${view === 'list' ? 'flex flex-col md:flex-row' : ''}
      `}
		>
			{/* Image Section */}
			<div
				className={`
          relative overflow-hidden 
          ${view === 'list' ? 'md:w-1/3' : 'h-48'}
        `}
			>
				<img
					src={defaultImage}
					alt={hotel.name}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

				{/* Star Rating (on image) */}
				<div className="absolute bottom-2 left-3">
					{renderStars(hotel.numberStars)}
				</div>

				{/* City badge */}
				<div className="absolute top-2 right-2">
					<span
						className="inline-block px-2 py-1 text-xs font-semibold text-white-0 rounded-full"
						style={{ backgroundColor: accentColor }}
					>
						{hotel.city}
					</span>
				</div>
			</div>

			{/* Content Section */}
			<div
				className={`
        p-4 flex flex-col
        ${view === 'list' ? 'md:w-2/3' : ''}
      `}
			>
				{/* Hotel Name and Basic Info */}
				<div className="flex justify-between items-start mb-2">
					<div>
						<h3 className="font-semibold text-lg text-gray-800 dark:text-white-0 line-clamp-1">
							{hotel.name}
						</h3>
						<p className="text-xs text-gray-600 dark:text-gray-400">
							{hotel.address}
						</p>
					</div>

					<button
						onClick={onToggle}
						className="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
					>
						<Icon
							icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
							width={20}
						/>
					</button>
				</div>

				{/* Quick Features Display */}
				<div className="flex flex-wrap gap-2 mb-3">
					{features.slice(0, 4).map((feature, index) => (
						<div
							key={index}
							className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
						>
							<Icon
								icon={feature.icon}
								className="mr-1 text-gray-600 dark:text-gray-400"
								width={12}
							/>
							<span className="text-gray-700 dark:text-gray-300">
								{feature.name}
							</span>
						</div>
					))}
				</div>

				{/* Hotel Preview */}
				<div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
					{hotel.textContent
						? hotel.textContent.substring(0, 150) + '...'
						: 'No description available.'}
				</div>

				{/* Expanded Content */}
				<div
					className={`
          transition-all duration-300 overflow-hidden
          ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
				>
					<div className="pt-3 border-t border-gray-200 dark:border-gray-700">
						<h4 className="font-medium text-gray-800 dark:text-white-0 mb-2">
							Hotel Features
						</h4>

						<div className="grid grid-cols-2 gap-3">
							{features.map((feature, index) => (
								<div key={index} className="flex items-start">
									<div
										className="p-1 rounded-full mr-2 flex-shrink-0"
										style={{ backgroundColor: `${accentColor}15` }}
									>
										<Icon
											icon={feature.icon}
											style={{ color: accentColor }}
											width={14}
										/>
									</div>
									<div className="text-sm">
										<p className="font-medium text-gray-700 dark:text-gray-300">
											{feature.name}
										</p>
										<p className="text-gray-600 dark:text-gray-400">
											{feature.value}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Hotel Description */}
						{hotel.textContent && (
							<div className="mt-3">
								<h4 className="font-medium text-gray-800 dark:text-white-0 mb-2">
									Description
								</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{hotel.textContent}
								</p>
							</div>
						)}

						{/* Hotel Pricing */}
						{hotel.price && hotel.price.length > 0 && (
							<div className="mt-3">
								<h4 className="font-medium text-gray-800 dark:text-white-0 mb-2">
									Room Rates
								</h4>
								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
										<thead className="bg-gray-50 dark:bg-gray-700">
											<tr>
												<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
													Room Type
												</th>
												<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
													Units
												</th>
												<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
													Price
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
											<tr>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													Single (DUI)
												</td>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													{hotel.price[0]?.DUInr || 0}
												</td>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													€{hotel.price[0]?.DUIprice || 0}
												</td>
											</tr>
											<tr>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													Double Room
												</td>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													{hotel.price[0]?.DoubleRoomNr || 0}
												</td>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													€{hotel.price[0]?.DoubleRoomPrice || 0}
												</td>
											</tr>
											<tr>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													Breakfast
												</td>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													Per person
												</td>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													€{hotel.price[0]?.breakfast || 0}
												</td>
											</tr>
											<tr>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													City Tax
												</td>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													Per night
												</td>
												<td className="px-4 py-2 text-gray-700 dark:text-gray-300">
													€{hotel.price[0]?.DailyTax || 0}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* View More Button */}
				<div className="mt-auto pt-3">
					<button
						onClick={onToggle}
						className="w-full py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
						style={{
							backgroundColor: `${accentColor}15`,
							color: accentColor
						}}
					>
						{isExpanded ? 'View Less' : 'View More'}
						<Icon
							icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
							className="ml-1"
							width={16}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default HotelCard
