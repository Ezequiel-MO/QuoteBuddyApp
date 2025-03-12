import { MapWrapper } from '@screens/vendor_map/Wrapper'
import React from 'react'

// This is a wrapper component that integrates your existing VendorMap component
const VendorMap: React.FC = () => {
	// You can add any additional props or context needed for the existing VendorMap component
	return (
		<div className="w-full h-full">
			{/* Use your existing MapWrapper or VendorMap component directly */}
			<MapWrapper />
		</div>
	)
}

export default VendorMap
