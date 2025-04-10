import { Icon } from '@iconify/react'
import { NavigateFunction } from 'react-router-dom'

interface CardAddGiftProps {
	navigate: NavigateFunction
}

export const CardAddGift: React.FC<CardAddGiftProps> = ({ navigate }) => {
	return (
		<div
			className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer flex flex-col h-full"
			onClick={() => navigate('/app/gift')}
		>
			<div className="relative w-full h-48 bg-gray-700 flex items-center justify-center">
				<div className="text-blue-400 text-6xl">
					<Icon icon="fluent:gift-card-add-20-regular" />
				</div>
			</div>

			<div className="p-4 flex-grow flex flex-col items-center justify-center">
				<h2 className="text-white-0 text-xl font-medium">ADD GIFT</h2>
				<p className="text-gray-400 text-sm mt-2 text-center">
					Click to add a new gift to the project
				</p>
			</div>
		</div>
	)
}
