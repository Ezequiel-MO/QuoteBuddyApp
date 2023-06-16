import { Icon } from '@iconify/react'

export const DraggingCard = ({
	item,
	index,
	handleDragStart,
	handleDrop,
	handleDragEnd,
	handleClick,
	onDelete
}) => {
	const handleDragOver = (e) => {
		e.preventDefault()
	}
	return (
		<div
			className="text-white-0 my-1 bg-gray-600 rounded-lg shadow-lg cursor-pointer px-6 border border-transparent flex items-center w-[280px] h-8 hover:bg-gray-50 focus:outline-none active:bg-orange-50 font-extrabold"
			draggable
			onDragStart={(e) => handleDragStart(e, index)}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDrop={(e) => {
				e.stopPropagation()
				handleDrop(e, index)
			}}
			onClick={(e) => handleClick(e, item, index)}
		>
			<p className="truncate">{item.name}</p>
			<span
				className="inline-block ml-auto cursor-pointer text-gray-500 hover:text-gray-700 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out"
				onClick={(e) => {
					e.stopPropagation()
					onDelete(item._id)
				}}
			>
				<Icon icon="lucide:delete" color="#ea5933" />
			</span>
		</div>
	)
}
