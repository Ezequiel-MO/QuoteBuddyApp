// src/screens/quotation/components/map/LocationsList.tsx
import React from 'react'
import { Icon } from '@iconify/react'

interface LocationsListProps {
	vendors: any[]
	activeInfoWindow?: any
	onVendorClick: (vendor: any) => void
	onShowAllVendors: () => void
}

const LocationsList: React.FC<LocationsListProps> = ({
	vendors,
	activeInfoWindow,
	onVendorClick,
	onShowAllVendors
}) => {
	return (
		<div className="controls bg-white-0 dark:bg-gray-800 p-4 overflow-y-auto w-64 border-r border-gray-200 dark:border-gray-700">
			<div className="mb-4">
				<h2 className="text-gray-800 dark:text-white-0 text-lg font-semibold mb-2">
					Locations
				</h2>
				<p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
					{vendors.length} locations found
				</p>

				{/* Search input */}
				<div className="relative">
					<input
						type="text"
						placeholder="Search locations..."
						className="w-full pl-8 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 dark:text-gray-300"
					/>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<Icon
							icon="mdi:magnify"
							className="text-gray-500 dark:text-gray-400"
							width={16}
						/>
					</div>
				</div>
			</div>

			{/* Vendor list */}
			<div className="space-y-2 max-h-[300px] overflow-y-auto">
				{vendors.map((vendor, index) => {
					const isActive =
						activeInfoWindow && activeInfoWindow.place === vendor.place

					return (
						<div
							key={`${vendor.place}-${index}`}
							className={`
                cursor-pointer px-3 py-2 rounded-lg transition-all duration-200
                ${
									isActive
										? 'bg-indigo-500 text-white-0 font-medium shadow-md transform scale-102'
										: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
								}
              `}
							onClick={() => onVendorClick(vendor)}
						>
							<div className="flex items-start">
								{/* Icon for vendor type */}
								<div className="mr-2 mt-1 flex-shrink-0">
									{vendor.icon && (
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill={vendor.icon.fillColor}
										>
											<path d={vendor.icon.path} />
										</svg>
									)}
								</div>

								{/* Vendor details */}
								<div className="flex-1 overflow-hidden">
									<p
										className={`font-medium truncate ${
											isActive
												? 'text-white-0'
												: 'text-gray-800 dark:text-gray-300'
										}`}
									>
										{vendor.place}
									</p>

									{vendor.distance !== null && (
										<p
											className={`text-xs ${
												isActive
													? 'text-indigo-100'
													: 'text-gray-500 dark:text-gray-400'
											} mt-1`}
										>
											{vendor.distance.toFixed(2)} km from center
										</p>
									)}
								</div>
							</div>
						</div>
					)
				})}
			</div>

			{/* Show all vendors button */}
			<button
				className="w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white-0 rounded-lg font-medium text-center transition-all duration-200"
				onClick={onShowAllVendors}
			>
				Show All Locations
			</button>
		</div>
	)
}

export default LocationsList
