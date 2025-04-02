// src/screens/projects/render/schedule/render/card/EventName.tsx
import { FC, MouseEvent, useState } from 'react'

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
	const [showTooltip, setShowTooltip] = useState(false)

	const handleNameClick = (e: MouseEvent<HTMLParagraphElement>) => {
		handleClick(e, event, index)
	}

	return (
		<div
			className="relative group w-full"
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
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

			{/* Improved tooltip with fixed positioning */}
			{showTooltip && (
				<div
					className="fixed z-50 p-2 bg-gray-800 text-white-0 rounded shadow-lg 
                    border border-gray-600 max-w-xs text-sm"
					style={{
						left: 'calc(50% + 20px)',
						transform: 'translateX(-50%)',
						top: '-40px'
					}}
				>
					{event.name}
				</div>
			)}
		</div>
	)
}
