import { FC, MouseEvent } from 'react'

interface EventNameProps {
	event: { name: string }
	index: number
	handleClick: (
		e: MouseEvent<HTMLParagraphElement>,
		event: any,
		index: number
	) => void
	listeners?: any
	isDragging: boolean
}

export const EventName: FC<EventNameProps> = ({
	event,
	index,
	handleClick,
	listeners,
	isDragging
}) => {
	const handleNameClick = (e: MouseEvent<HTMLParagraphElement>) => {
		handleClick(e, event, index)
	}

	return (
		<div className="relative group w-full">
			<p
				{...listeners}
				className={`
          truncate font-medium text-white-0 group-hover:text-cyan-200 transition-colors duration-200
          ${
						isDragging
							? 'text-white-0 cursor-grabbing'
							: 'cursor-grab hover:text-cyan-100'
					}
        `}
				onDoubleClick={handleNameClick}
				title={event.name}
			>
				{event.name}
			</p>

			{/* Tooltip that appears on hover */}
			<div className="absolute left-0 -top-10 w-auto max-w-xs p-2 bg-gray-800 text-white-0 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none whitespace-normal">
				{event.name}
			</div>
		</div>
	)
}
