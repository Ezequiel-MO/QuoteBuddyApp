import { FC, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

interface AddTransfersActionIconProps {
	onClick: () => void
	isVisible: boolean
}

export const AddTransfersActionIcon: FC<AddTransfersActionIconProps> = ({
	onClick,
	isVisible
}) => {
	const [showTooltip, setShowTooltip] = useState(false)
	const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
	const iconRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (showTooltip && iconRef.current) {
			const rect = iconRef.current.getBoundingClientRect()
			setTooltipPosition({
				top: rect.top - 35,
				left: rect.left + rect.width / 2
			})
		}
	}, [showTooltip])

	const handleMouseEnter = () => {
		setShowTooltip(true)
	}

	const handleMouseLeave = () => {
		setShowTooltip(false)
	}

	if (!isVisible) return null

	return (
		<div className="relative ml-2">
			<motion.div
				ref={iconRef}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				whileHover={{ scale: 1.1 }}
				className="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Icon
					icon="mdi:note-plus"
					className={`mr-2 flex-shrink-0`}
					width={18}
					height={18}
					onClick={(e) => {
						e.stopPropagation()
						onClick()
					}}
				/>
			</motion.div>

			{showTooltip && (
				<div
					className="fixed z-50 p-2 bg-gray-800 text-white-0 rounded shadow-lg 
						border border-gray-600 text-sm max-w-xs pointer-events-none
						transition-opacity duration-200"
					style={{
						top: `${tooltipPosition.top}px`,
						left: `${tooltipPosition.left}px`,
						transform: 'translateX(-50%)',
						opacity: 0.95
					}}
				>
					Configure Transfers
				</div>
			)}
		</div>
	)
}
