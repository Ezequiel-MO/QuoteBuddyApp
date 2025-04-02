import { FC, MouseEvent, useState, useRef, useEffect } from 'react'

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
	const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
	const nameRef = useRef<HTMLParagraphElement>(null)

	// Handle showing tooltip based on text overflow
	useEffect(() => {
		const element = nameRef.current
		if (element) {
			// Only show tooltip if text is actually overflowing
			const isOverflowing = element.scrollWidth > element.clientWidth
			if (isOverflowing) {
				const rect = element.getBoundingClientRect()
				setTooltipPosition({
					top: rect.top - 40, // Position above the element
					left: rect.left + rect.width / 2 // Center align
				})
			} else {
				setShowTooltip(false) // Don't show tooltip if not overflowing
			}
		}
	}, [event.name, showTooltip])

	const handleNameClick = (e: MouseEvent<HTMLParagraphElement>) => {
		handleClick(e, event, index)
	}

	const handleMouseEnter = () => {
		const element = nameRef.current
		if (element && element.scrollWidth > element.clientWidth) {
			setShowTooltip(true)
		}
	}

	return (
		<div className="relative w-full">
			<p
				ref={nameRef}
				{...listeners}
				className={`
          truncate font-medium text-white-0 hover:text-cyan-200 transition-colors duration-200
          ${
						isDragging
							? 'text-white-0 cursor-grabbing'
							: 'cursor-grab hover:text-cyan-100'
					}
        `}
				onDoubleClick={handleNameClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={() => setShowTooltip(false)}
			>
				{event.name}
			</p>

			{/* Improved tooltip with fixed positioning */}
			{showTooltip && (
				<div
					className="fixed z-50 p-2 bg-gray-800 text-white-0 rounded shadow-lg 
                    border border-gray-600 text-sm max-w-xs transition-opacity duration-200"
					style={{
						top: `${tooltipPosition.top}px`,
						left: `${tooltipPosition.left}px`,
						transform: 'translateX(-50%)',
						opacity: 0.95
					}}
				>
					{event.name}
				</div>
			)}
		</div>
	)
}
