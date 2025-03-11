import React from 'react'
import { CoordItem } from './MapLogic'

interface Props {
	vendors: CoordItem[]
	setLocation: (location: CoordItem) => void
	onVendorClick?: (vendor: CoordItem) => void
	onShowAllVendors?: () => void
	activeInfoWindow?: CoordItem
}

export const VendorList: React.FC<Props> = ({
	vendors,
	setLocation,
	onVendorClick,
	onShowAllVendors,
	activeInfoWindow
}) => {
	// Handler for vendor item click
	const handleVendorClick = (vendor: CoordItem) => {
		setLocation({
			...vendor,
			place: vendor.place,
			coords: vendor.coords
		})
		onVendorClick && onVendorClick(vendor)
	}

	// Handler for "Show all vendors" button
	const handleShowAllVendors = () => {
		onShowAllVendors && onShowAllVendors()
	}

	return (
		<div className="controls bg-transparent p-4 overflow-y-auto">
			<div className="mb-4">
				<h2 className="text-white-0 text-xl font-bold mb-2">Vendors</h2>
				<p className="text-gray-300 text-sm mb-4">
					{vendors.length} locations found
				</p>

				{/* Search filter could be added here in the future */}
			</div>

			{/* Vendor list */}
			<div className="space-y-2">
				{vendors.map((vendor, index) => {
					const isActive =
						activeInfoWindow && activeInfoWindow.place === vendor.place

					return (
						<div
							key={`${vendor.place}-${index}`}
							className={`
                cursor-pointer px-4 py-3 rounded-lg transition-all duration-200
                ${
									isActive
										? 'bg-orange-500 text-white-0 font-semibold shadow-md transform scale-102'
										: 'bg-white bg-opacity-10 hover:bg-opacity-20'
								}
              `}
							onClick={() => handleVendorClick(vendor)}
						>
							<div className="flex items-start">
								{/* Icon for vendor type */}
								<div className="mr-3 mt-1">
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
									<p className="font-medium truncate">{vendor.place}</p>

									{vendor.distance !== null && (
										<p className="text-xs text-gray-300 mt-1">
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
				className="w-full mt-6 py-3 px-4 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full font-semibold text-center transition-all duration-200"
				onClick={handleShowAllVendors}
			>
				Show all vendors
			</button>
		</div>
	)
}
