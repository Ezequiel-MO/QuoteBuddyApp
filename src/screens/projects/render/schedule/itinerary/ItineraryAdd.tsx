import { Icon } from '@iconify/react'

export const ItineraryAdd = () => {
	const handleClick = () => {}
	return (
		<div
			className="rounded-lg cursor-pointer border-2 border-dotted border-gray-500 bg-gray-800 w-full flex items-center justify-between p-4 hover:border-orange-500 active:scale-95 transition duration-150 ease-in-out"
			onClick={handleClick}
		>
			<h2 className="text-sm font-semibold text-gray-300 truncate flex flex-row items-center justify-center">
				<Icon icon="bi:plus" width="30" className="text-orange-500 mr-2" />
				<span className="uppercase whitespace-nowrap">Add Transfer</span>
			</h2>
		</div>
	)
}
