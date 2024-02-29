import { Icon } from '@iconify/react'
import React from 'react'

const TopBar: React.FC = () => {
	return (
		<div className="flex justify-between items-center dark:text-white-0 p-4">
			{/* Placeholder for icons and titles, replace with your actual icons and titles */}
			<div className="flex space-x-4">
				<div className="flex flex-col items-center cursor-pointer">
					<Icon icon="bx:world" width="30" color="#ea5933" />
					<span>Destination</span>
				</div>
				<div className="flex flex-col items-center cursor-pointer">
					<Icon icon="akar-icons:map" width="30" color="#ea5933" />
					<span>Map</span>
				</div>
				<div className="flex flex-col items-center cursor-pointer">
					<Icon icon="bi:calendar-check" width="30" color="#ea5933" />
					<span>Overview</span>
				</div>
				<div className="flex flex-col items-center cursor-pointer">
					<Icon icon="ant-design:printer-twotone" width="30" color="#ea5933" />
					<span>PDF</span>
				</div>
			</div>
		</div>
	)
}

export default TopBar
